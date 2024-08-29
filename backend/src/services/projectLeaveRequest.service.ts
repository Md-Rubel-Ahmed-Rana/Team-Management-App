import { INotification } from "@/interfaces/notification.interface";
import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import ApiError from "@/shared/apiError";
import { NotificationEnums } from "enums";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { config } from "@/configurations/envConfig";
import { ProjectService } from "./project.service";

class Service {
  async requestToLeave(data: {
    project: string;
    member: string;
    admin: string;
  }): Promise<void> {
    const isExist = await ProjectLeaveRequest.findOne({
      project: data.project,
      member: data.member,
    });
    if (isExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You already have requested to leave"
      );
    }
    const result = await ProjectLeaveRequest.create(data);
    const project: any = await result.populate([
      {
        path: "project",
        model: "Project",
        select: { name: 1, category: 1 },
      },
      {
        path: "member",
        model: "User",
        select: "name",
      },
      {
        path: "admin",
        model: "User",
        select: { name: 1, email: 1 },
      },
    ]);

    const notifyObject: INotification = {
      title: "Project Leave Request",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: data?.member,
      receiver: data?.admin,
      content: `Dear ${project?.admin?.name}, ${project?.member?.name} has requested to leave the project "${project?.project?.name}" in the ${project?.project?.category} category. Please review their request and take the necessary actions.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${
        project?.admin?.id || project?.admin?._id
      }&name=${project?.admin?.name}&email=${project?.admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async acceptLeaveRequest(projectId: string, memberId: string): Promise<void> {
    await ProjectService.removeMember(projectId, memberId);
    const project: any = await ProjectLeaveRequest.findOneAndUpdate(
      { project: projectId, member: memberId },
      { $set: { status: "accepted" } },
      { new: true }
    ).populate([
      {
        path: "project",
        model: "Project",
        select: { name: 1, category: 1 },
      },
      {
        path: "member",
        model: "User",
        select: { name: 1, email: 1 },
      },
    ]);

    const notifyObject: INotification = {
      title: "Your Project Leave Request Has Been Accepted",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: project?.admin,
      receiver: memberId,
      content: `Dear ${project?.member?.name}, your request to leave the project "${project?.project?.name}" in the ${project?.project?.category} category has been accepted. We want to express our gratitude for your contributions and efforts during your time on this project. We wish you all the best in your future endeavors.`,
      link: `${config.app.frontendDomain}/projects/joined-projects?userId=${
        project?.member?.id || project?.member?._id
      }&name=${project?.member?.name}&email=${project?.member?.email}`,
    };

    await NotificationService.createNotification(notifyObject);
  }

  async getLeaveRequestByAdmin(admin: string) {
    const result = await ProjectLeaveRequest.find({ admin, status: "pending" })
      .populate({
        path: "project",
        model: "Project",
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
    const result: any = await ProjectLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    ).populate([
      {
        path: "project",
        model: "Project",
        select: "name",
      },
      {
        path: "member",
        model: "User",
        select: "name",
      },
    ]);

    const notifyObject: INotification = {
      title: "Project Leave Request Declined",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: result?.admin,
      receiver: result?.member?._id,
      content: `Dear ${result?.member?.name}, your request to leave the project "${result?.project?.name}" has been reviewed. The admin has decided that your continued participation is valuable to the success of the project. We believe your skills and contributions are essential to achieving our goals together. Let's continue to work towards our shared success.`,
      link: `${config.app.frontendDomain}/projects/joined-projects?userId=${result?.member?._id}`,
    };

    // Send notification to the member
    await NotificationService.createNotification(notifyObject);
  }

  async getMemberRequest(memberId: string): Promise<any> {
    const result = await ProjectLeaveRequest.findOne({
      member: memberId,
      status: "pending",
    })
      .populate({
        path: "project",
        model: "Project",
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

export const ProjectLeaveRequestService = new Service();
