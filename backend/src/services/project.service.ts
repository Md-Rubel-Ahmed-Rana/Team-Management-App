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

  // remaining to apply DTO

  async getSingleProject(id: string): Promise<IProject | null> {
    const result = await Project.findById(id)
      .populate("members.member")
      .populate("team", "name");
    return result;
  }

  async addMember(
    projectId: string,
    memberId: string,
    role: string
  ): Promise<IProject | null> {
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

    const result = await Project.findByIdAndUpdate(projectId, {
      $push: { members: { role, member: memberId } },
    });

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
    return result;
  }

  async removeMember(
    projectId: string,
    memberId: string
  ): Promise<IProject | null> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    const memberIndex = project.members.findIndex(
      (member: any) => member.member.toString() === memberId
    );

    if (memberIndex === -1) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Member not found in the project"
      );
    }

    project.members.splice(memberIndex, 1);

    const result = await project.save();

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

    return result;
  }
}

export const ProjectService = new Service();
