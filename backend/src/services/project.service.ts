import httpStatus from "http-status";
import { IProject } from "../interfaces/project.interface";
import { Project } from "../models/project.model";
import ApiError from "../shared/apiError";

class Service {
  async createProject(data: IProject): Promise<IProject> {
    const result = await Project.create(data);
    return result;
  }

  async getProjectsByTeamId(teamId: string): Promise<IProject[]> {
    const result = await Project.find({ team: teamId }).populate(
      "members.member"
    );
    return result;
  }

  async myProjects(userId: string): Promise<IProject[]> {
    const result = await Project.find({ user: userId });
    return result;
  }

  async getSingleProject(id: string): Promise<IProject | null> {
    console.log("Inside getSingleProject Service");
    const result = await Project.findById(id)
      .populate("members.member")
      .populate("teamId", "name");
    return result;
  }

  async updateProject(
    id: string,
    data: Partial<IProject>
  ): Promise<IProject | null> {
    const { name, category } = data;
    const result = await Project.findOneAndUpdate(
      { _id: id },
      { $set: { name, category } },
      { new: true }
    );
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

    return result;
  }
}

export const ProjectService = new Service();
