import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";

class Service {
  async requestToLeave(data: { team: string; member: string; admin: string }) {
    const result = await TeamLeaveRequest.create(data);
    return result;
  }

  async getLeaveRequestByAdmin(admin: string) {
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

  async ignoreRequest(requestId: string) {
    console.log("From team ignore", requestId);
    const result = await TeamLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    );
    return result;
  }

  async getMemberRequest(memberId: string) {
    const result = await TeamLeaveRequest.find({
      member: memberId,
      status: "pending",
    });
    return result;
  }
}

export const TeamLeaveRequestService = new Service();
