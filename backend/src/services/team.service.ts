import { IGetTeam, ITeam } from "@/interfaces/team.interface";
import { Project } from "@/models/project.model";
import Team from "@/models/team.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import mongoose, { Types } from "mongoose";
import { ProjectService } from "./project.service";
import extractCloudinaryPublicId from "@/utils/getCloudinaryFilePublicIdFromUrl";
import { deleteSingleFileFromCloudinary } from "@/utils/deletePreviousFileFromCloudinary";
import { UserSelect } from "propertySelections";
import { INotification } from "@/interfaces/notification.interface";
import { NotificationEnums } from "enums";
import { config } from "@/configurations/envConfig";
import { UserService } from "./user.service";
import { IGetUser } from "@/interfaces/user.interface";
import { IGetProject } from "@/interfaces/project.interface";

class Service {
  // Temporarily using as alternative of DTO
  private userSanitizer(user: any): IGetUser {
    return {
      id: String(user?._id),
      name: user?.name,
      email: user?.email,
      department: user?.department || "",
      designation: user?.designation || "",
      phoneNumber: user?.phoneNumber || "",
      profile_picture: user?.profile_picture || "",
      presentAddress: user?.presentAddress || "",
      permanentAddress: user?.permanentAddress || "",
      country: user?.country || "",
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }

  private projectSanitizer(project: any): IGetProject {
    const members = project?.members?.map((user: IGetUser) =>
      this.userSanitizer(user)
    );
    const leaveRequests = project?.leaveRequests?.map((user: IGetUser) =>
      this.userSanitizer(user)
    );
    return {
      id: String(project?._id),
      team: project?.team,
      user: project?.user,
      name: project?.name,
      category: project?.category,
      members: members,
      leaveRequests: leaveRequests,
      tasks: project?.tasks || 0,
      createdAt: project?.createdAt,
      updatedAt: project?.updatedAt,
    };
  }

  private teamSanitizer(team: any): IGetTeam {
    const admin = this.userSanitizer(team?.admin);
    const projects = team.projects?.map((project: IGetProject) =>
      this.projectSanitizer(project)
    );
    const leaveRequests = team?.leaveRequests?.map((user: IGetUser) =>
      this.userSanitizer(user)
    );
    const activeMembers = team?.activeMembers?.map((user: IGetUser) =>
      this.userSanitizer(user)
    );
    const pendingMembers = team?.pendingMembers?.map((user: IGetUser) =>
      this.userSanitizer(user)
    );
    return {
      id: String(team?._id),
      name: team?.name,
      category: team?.category,
      description: team?.description,
      image: team?.image || "",
      admin: admin,
      projects: projects,
      leaveRequests: leaveRequests,
      activeMembers: activeMembers,
      pendingMembers: pendingMembers,
      createdAt: team?.createdAt,
      updatedAt: team?.updatedAt,
    };
  }

  async createTeam(data: ITeam): Promise<any> {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "This team name is already exist"
      );
    }
  }

  async getSingleTeam(id: string): Promise<IGetTeam> {
    const result = await Team.findById(id).populate([
      {
        path: "activeMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "admin",
        model: "User",
        select: UserSelect,
      },
      {
        path: "leaveRequests",
        model: "User",
        select: UserSelect,
      },
      {
        path: "projects",
        model: "Project",
      },
    ]);
    const dtoData = this.teamSanitizer(result);
    return dtoData;
  }

  async getAllTeams(): Promise<any> {
    const teams = await Team.find({}).populate([
      {
        path: "activeMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "admin",
        model: "User",
        select: UserSelect,
      },
      {
        path: "leaveRequests",
        model: "User",
        select: UserSelect,
      },
      {
        path: "projects",
        model: "Project",
      },
    ]);
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    return dtoData;
  }

  async getMyTeams(adminId: string): Promise<any> {
    const teams = await Team.find({ admin: adminId }).populate([
      {
        path: "activeMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "admin",
        model: "User",
        select: UserSelect,
      },
      {
        path: "leaveRequests",
        model: "User",
        select: UserSelect,
      },
      {
        path: "projects",
        model: "Project",
      },
    ]);
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    return dtoData;
  }

  async getJoinedTeams(memberId: string): Promise<any> {
    const teams = await Team.find({ activeMembers: memberId }).populate([
      {
        path: "activeMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "admin",
        model: "User",
        select: UserSelect,
      },
      {
        path: "leaveRequests",
        model: "User",
        select: UserSelect,
      },
      {
        path: "projects",
        model: "Project",
      },
    ]);
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    return dtoData;
  }

  async updateTeam(
    id: string,
    data: ITeam
  ): Promise<Types.ObjectId[] | undefined> {
    const isExistTeam: any = await Team.findById(id);
    if (!isExistTeam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    const members = [
      ...(isExistTeam?.activeMembers || []),
      ...(isExistTeam?.pendingMembers || []),
    ];
    // Update the team data
    const team: any = await Team.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    ).populate([
      {
        path: "activeMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: UserSelect,
      },
      {
        path: "admin",
        model: "User",
        select: UserSelect,
      },
    ]);

    if (isExistTeam?.name !== data?.name) {
      // Notify all members about the name change
      const allMembers = [
        ...(team?.activeMembers || []),
        ...(team?.pendingMembers || []),
      ];

      await Promise.all(
        allMembers.map(async (member: any) => {
          const notifyObject: INotification = {
            title: "Team Name Updated",
            type: NotificationEnums.TEAM_UPDATED,
            receiver: member?._id,
            sender: team?.admin,
            content: `Dear ${member?.name}, the team name has been updated. The team "${isExistTeam?.name}" is now named "${data?.name}". Thank you for staying up to date with these changes!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject);
        })
      );
      return members;
    }
  }

  async deleteTeam(id: string): Promise<Types.ObjectId[]> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const team: any = await Team.findById(id);
      if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
      }
      const members = [
        ...(team?.activeMembers || []),
        ...(team?.pendingMembers || []),
      ];

      // // Handle Cloudinary file deletion
      const public_id = extractCloudinaryPublicId(team?.image);
      if (public_id) {
        await deleteSingleFileFromCloudinary(public_id);
      }

      // Delete the team
      await Team.findByIdAndDelete(id).session(session);

      // Delete related projects
      await ProjectService.deleteProjectsByTeamId(id, session);

      await Promise.all(
        members.map(async (member: any) => {
          const notifyObject: INotification = {
            title: "Team Deleted",
            type: NotificationEnums.TEAM_DELETED,
            receiver: member?._id,
            sender: team?.admin,
            content: `We're deeply grateful for your time and contributions to the team. As we say goodbye, we want to express our heartfelt thanks and admiration. Wishing you all the best in your future endeavors!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject, session);
        })
      );

      await session.commitTransaction();
      return members?.map((member: any) => member?.id);
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Team was not deleted");
    } finally {
      session.endSession();
    }
  }

  async sendLeaveRequest(teamId: string, memberId: string) {
    const team: any = await Team.updateOne(
      { _id: teamId },
      { $push: { leaveRequests: memberId } }
    );

    const admin = await UserService.findUserById(team?.admin);
    const notifyObject: INotification = {
      title: "Team Leave Request",
      type: NotificationEnums.TEAM_LEFT,
      sender: memberId,
      receiver: admin?.id,
      content: `You have received a new request from a team member to leave the team. Please review the request and take appropriate action.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${admin?.id}&name=${admin?.name}&email=${admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async cancelLeaveRequest(teamId: string, memberId: string) {
    console.log({ teamId, memberId });
    const team: any = await Team.updateOne(
      { _id: teamId },
      { $pull: { leaveRequests: memberId } }
    );
    const admin = await UserService.findUserById(team?.admin);
    const notifyObject: INotification = {
      title: "Team Leave Request",
      type: NotificationEnums.TEAM_LEFT,
      sender: memberId,
      receiver: admin?.id,
      content: `Team Leave Request Cancelled`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${admin?.id}&name=${admin?.name}&email=${admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async rejectLeaveRequest(teamId: string, memberId: string) {
    const team: any = await Team.updateOne(
      { _id: teamId },
      { $pull: { leaveRequests: memberId } }
    );
    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Leave Request Rejected",
      type: NotificationEnums.TEAM_LEFT,
      sender: team.admin,
      receiver: memberId,
      content: `Your request to leave the team "${team?.name}" has been declined by the admin.`,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
    };

    // Send notification to the member
    await NotificationService.createNotification(notifyObject);
  }

  async acceptLeaveRequest(teamId: string, memberId: string) {
    console.log({ teamId, memberId });
    const team: any = await Team.updateOne(
      { _id: teamId },
      { $pull: { leaveRequests: memberId, activeMembers: memberId } },
      { new: true }
    );
    // Remove this member from projects by member ID
    await Project.updateMany(
      { team: teamId },
      { $pull: { members: { memberId: memberId } } }
    );

    if (team && team?.admin) {
      const member = await UserService.findUserById(memberId);
      const notifyObject: INotification = {
        title:
          "Your Leave Request Accepted And You Have Been Removed from a Team",
        type: NotificationEnums.TEAM_MEMBER_REMOVED,
        content: `Thank you for the time and effort you dedicated to the team "${team?.name}" in the "${team?.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
        receiver: memberId,
        sender: team?.admin,
        link: `${config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
      };
      await NotificationService.createNotification(notifyObject);
    }
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {
    // Remove member from team
    await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } }
    );

    const team = await Team.findById(teamId);

    // Remove this member from projects by member ID
    await Project.updateMany(
      { team: teamId },
      { $pull: { members: { memberId: memberId } } }
    );

    if (team && team?.admin) {
      const member = await UserService.findUserById(memberId);
      const notifyObject: INotification = {
        title: "You Have Been Removed from a Team",
        type: NotificationEnums.TEAM_MEMBER_REMOVED,
        content: `Thank you for the time and effort you dedicated to the team "${team?.name}" in the "${team?.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
        receiver: memberId,
        sender: team?.admin,
        link: `${config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
      };
      await NotificationService.createNotification(notifyObject);
    }
  }
}
export const TeamService = new Service();
