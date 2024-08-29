import { INotification } from "@/interfaces/notification.interface";
import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";
import ApiError from "@/shared/apiError";
import { NotificationEnums } from "enums";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { config } from "@/configurations/envConfig";
import Team from "@/models/team.model";
import { Project } from "@/models/project.model";
import { UserService } from "./user.service";

class Service {
  async requestToLeave(data: {
    team: string;
    member: string;
    admin: string;
  }): Promise<void> {
    const isExist = await TeamLeaveRequest.findOne({
      team: data.team,
      member: data.member,
    });
    if (isExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You already have requested to leave"
      );
    }
    const result = await TeamLeaveRequest.create(data);
    const team: any = await result.populate([
      {
        path: "admin",
        model: "User",
        select: { name: 1, email: 1 },
      },
    ]);
    const notifyObject: INotification = {
      title: "Team Leave Request",
      type: NotificationEnums.TEAM_LEFT,
      sender: data?.member,
      receiver: data?.admin,
      content: `You have received a new request from a team member to leave the team. Please review the request and take appropriate action.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${
        team?.admin?.id || team?.admin?._id
      }&name=${team?.admin?.name}&email=${team?.admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async getLeaveRequestByAdmin(admin: string): Promise<any> {
    const result = await TeamLeaveRequest.find({ admin, status: "pending" })
      .populate({
        path: "team",
        model: "Team",
        select: "name",
      })
      .populate({
        path: "member",
        model: "User",
        select: "name",
      });

    return result;
  }

  async ignoreRequest(requestId: string): Promise<void> {
    const result: any = await TeamLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    ).populate([
      {
        path: "member",
        model: "User",
        select: { name: 1, email: 1 },
      },
      {
        path: "admin",
        model: "User",
        select: { name: 1, email: 1 },
      },
      {
        path: "team",
        model: "Team",
        select: { name: 1 },
      },
    ]);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Leave request not found");
    }

    const notifyObject: INotification = {
      title: "Leave Request Declined",
      type: NotificationEnums.TEAM_LEFT,
      sender: result.admin?._id || result.admin?.id,
      receiver: result.member?._id,
      content: `Your request to leave the team "${result?.team?.name}" has been declined by the admin.`,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${
        result.admin?._id || result.admin?.id
      }&name=${result?.admin?.name}&email=${result?.admin?.email}`,
    };

    // Send notification to the member
    await NotificationService.createNotification(notifyObject);
  }

  async acceptLeaveRequest(teamId: string, memberId: string): Promise<void> {
    // Remove member from team
    await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } }
    );

    const team: any = await Team.findById(teamId);

    if (!team) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team not found");
    }

    // Remove this member from projects by member ID
    await Project.updateMany(
      { team: teamId },
      { $pull: { members: memberId } }
    );

    // Update leave request for team
    await TeamLeaveRequest.findOneAndUpdate(
      { team: teamId, member: memberId },
      { $set: { status: "accepted" } }
    );

    const member = await UserService.findUserById(memberId);
    // Send notification to the member
    const notifyObject: INotification = {
      title: "Team Leave Request Accepted",
      type: NotificationEnums.TEAM_LEFT,
      sender: team?.admin,
      receiver: memberId,
      content: `Your request to leave the team "${team?.name}" has been accepted by the admin. You have been successfully removed from the team and this team related projects and tasks.`,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
    };

    await NotificationService.createNotification(notifyObject);
  }

  async getMemberRequest(memberId: string): Promise<any> {
    const result = await TeamLeaveRequest.find({
      member: memberId,
      status: "pending",
    })
      .populate({
        path: "team",
        model: "Team",
        select: "name",
      })
      .populate({
        path: "member",
        model: "User",
        select: "name",
      });

    return result;
  }
}

export const TeamLeaveRequestService = new Service();
