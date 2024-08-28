import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";

class Service {
  async requestToLeave(data: {
    project: string;
    member: string;
    admin: string;
  }): Promise<any> {
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
    return result;
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

  async ignoreRequest(requestId: string): Promise<any> {
    const result = await ProjectLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    )
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
