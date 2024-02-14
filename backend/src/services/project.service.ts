import { IProject } from "@/interfaces/project.interface";
import { Project } from "@/models/project.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import { mapper } from "../mapper";
import { ProjectEntity } from "@/entities/project.entity";
import { ModelIdentifier } from "@automapper/core";
import { CreateProjectDTO } from "@/dto/project/create";
import { GetOnlyProjectDTO } from "@/dto/project/getOnlyProject";
import { GetProjectDTO } from "@/dto/project/get";
import { UpdateProjectDTO } from "@/dto/project/update";

class Service {
  async createProject(data: IProject): Promise<CreateProjectDTO> {
    const result = await Project.create(data);
    const mappedData = mapper.map(
      result,
      ProjectEntity as ModelIdentifier,
      CreateProjectDTO
    );
    return mappedData;
  }

  async myProjects(userId: string): Promise<GetOnlyProjectDTO[]> {
    const result = await Project.find({ user: userId });
    const mappedData = mapper.mapArray(
      result,
      ProjectEntity as ModelIdentifier,
      GetOnlyProjectDTO
    );
    return mappedData;
  }

  async assignedProjects(memberId: string): Promise<GetOnlyProjectDTO[]> {
    const result = await Project.find({ "members.member": memberId });
    const mappedData = mapper.mapArray(
      result,
      ProjectEntity as ModelIdentifier,
      GetOnlyProjectDTO
    );
    return mappedData;
  }

  async updateProject(
    id: string,
    data: Partial<IProject>
  ): Promise<GetOnlyProjectDTO | null> {
    const { name, category } = data;
    const result = await Project.findOneAndUpdate(
      { _id: id },
      { $set: { name, category } },
      { new: true }
    );

    const mappedData = mapper.map(
      result,
      ProjectEntity as ModelIdentifier,
      GetOnlyProjectDTO
    );
    return mappedData;
  }

  async getSingleProject(id: string): Promise<GetProjectDTO | null> {
    const result = await Project.findById(id)
      .populate("members")
      .populate("team", "name");
    const mappedData = mapper.map(
      result,
      ProjectEntity as ModelIdentifier,
      GetProjectDTO
    );
    return mappedData;
  }

  async addMember(
    projectId: string,
    memberId: string
  ): Promise<UpdateProjectDTO | null> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    const existingMember = await Project.findOne({
      _id: projectId,
      "members.member": memberId,
    });

    if (existingMember) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This member is already in this project"
      );
    }

    const result = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { members: memberId },
      },
      { new: true }
    );

    if (project?.user) {
      await NotificationService.sendNotification(
        project?.user,
        memberId,
        "project_invitation",
        "Assigned to project",
        `You've been added to a project (${project?.name})`,
        `projects?team=${project?.team}&id=${project._id}&name=${project?.name}`
      );
    }
    const mappedData = mapper.map(
      result,
      ProjectEntity as ModelIdentifier,
      UpdateProjectDTO
    );
    return mappedData;
  }

  async removeMember(
    projectId: string,
    memberId: string
  ): Promise<UpdateProjectDTO | null> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    const result = await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { members: memberId },
      },
      { new: true }
    );

    // update leave request for project
    await ProjectLeaveRequest.findOneAndUpdate(
      { project: projectId },
      { $set: { status: "accepted" } }
    ).sort({ createdAt: -1 });

    if (project?.user) {
      await NotificationService.sendNotification(
        project?.user,
        memberId,
        "project_invitation",
        "Assigned to project",
        `You've been removed from a project (${project?.name})`,
        "projects"
      );
    }

    const mappedData = mapper.map(
      result,
      ProjectEntity as ModelIdentifier,
      UpdateProjectDTO
    );
    return mappedData;
  }
}

export const ProjectService = new Service();
