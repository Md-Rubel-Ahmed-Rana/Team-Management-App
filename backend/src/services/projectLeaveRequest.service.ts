import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import { mapper } from "../mapper";
import { CreateProjectLeaveDTO } from "@/dto/projectLeave/create";
import { ModelIdentifier } from "@automapper/core";
import { ProjectLeaveEntity } from "@/entities/projectLeave.entity";
import { GetProjectLeaveDTO } from "@/dto/projectLeave/get";
import { UpdateProjectLeaveDTO } from "@/dto/projectLeave/update";

class Service {
  async requestToLeave(data: {
    project: string;
    member: string;
    admin: string;
  }): Promise<CreateProjectLeaveDTO> {
    const result = await ProjectLeaveRequest.create(data);
    const mappedData = mapper.map(
      result,
      ProjectLeaveEntity as ModelIdentifier,
      CreateProjectLeaveDTO
    );
    return mappedData;
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
    const mappedData = mapper.mapArray(
      result,
      ProjectLeaveEntity as ModelIdentifier,
      GetProjectLeaveDTO
    );
    return mappedData;
  }

  async ignoreRequest(requestId: string): Promise<UpdateProjectLeaveDTO> {
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
    const mappedData = mapper.map(
      result,
      ProjectLeaveEntity as ModelIdentifier,
      UpdateProjectLeaveDTO
    );
    return mappedData;
  }

  async getMemberRequest(memberId: string): Promise<GetProjectLeaveDTO> {
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
    const mappedData = mapper.map(
      result,
      ProjectLeaveEntity as ModelIdentifier,
      GetProjectLeaveDTO
    );
    return mappedData;
  }
}

export const ProjectLeaveRequestService = new Service();
