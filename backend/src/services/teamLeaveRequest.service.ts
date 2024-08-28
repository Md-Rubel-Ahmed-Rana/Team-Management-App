import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";

class Service {
  async requestToLeave(data: {
    team: string;
    member: string;
    admin: string;
  }): Promise<any> {
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
    return result;
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

  async ignoreRequest(requestId: string): Promise<any> {
    const result = await TeamLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    );

    return result;
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
