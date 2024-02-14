import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";
import { mapper } from "../mapper";
import { TeamLeaveEntity } from "@/entities/teamLeave.entity";
import { ModelIdentifier } from "@automapper/core";
import { CreateTeamLeaveDTO } from "@/dto/teamLeave/create";
import { GetTeamLeaveDTO } from "@/dto/teamLeave/get";
import { UpdateTeamLeaveDTO } from "@/dto/teamLeave/update";

class Service {
  async requestToLeave(data: {
    team: string;
    member: string;
    admin: string;
  }): Promise<CreateTeamLeaveDTO> {
    const result = await TeamLeaveRequest.create(data);
    const mappedData = mapper.map(
      result,
      TeamLeaveEntity as ModelIdentifier,
      CreateTeamLeaveDTO
    );
    return mappedData;
  }

  async getLeaveRequestByAdmin(admin: string): Promise<GetTeamLeaveDTO[]> {
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

    const mappedData = mapper.mapArray(
      result,
      TeamLeaveEntity as ModelIdentifier,
      GetTeamLeaveDTO
    );
    return mappedData;
  }

  async ignoreRequest(requestId: string): Promise<UpdateTeamLeaveDTO> {
    const result = await TeamLeaveRequest.findByIdAndUpdate(
      requestId,
      { $set: { status: "ignored" } },
      { new: true }
    );
    const mappedData = mapper.map(
      result,
      TeamLeaveEntity as ModelIdentifier,
      UpdateTeamLeaveDTO
    );
    return mappedData;
  }

  async getMemberRequest(memberId: string): Promise<GetTeamLeaveDTO[]> {
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
    const mappedData = mapper.mapArray(
      result,
      TeamLeaveEntity as ModelIdentifier,
      GetTeamLeaveDTO
    );
    return mappedData;
  }
}

export const TeamLeaveRequestService = new Service();
