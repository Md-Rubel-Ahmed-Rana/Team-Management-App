import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";

class Service {
  async requestToLeave(data: {
    project: string;
    member: string;
    admin: string;
  }) {
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

  async ignoreRequest(requestId: string) {
    const result = await ProjectLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    );
    return result;
  }

  async getMemberRequest(memberId: string) {
    const result = await ProjectLeaveRequest.findOne({
      member: memberId,
      status: "pending",
    });
    return result;
  }
}

export const ProjectLeaveRequestService = new Service();
