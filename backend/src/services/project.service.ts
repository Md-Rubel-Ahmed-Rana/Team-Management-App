import { Project } from "../models/project.model";

class Service {
  async createProject(data: any) {
    const result = await Project.create(data);
    return result;
  }

  async getProjectsByTeamId(teamId: string) {
    const result = await Project.find({ teamId }).populate("members.member");
    return result;
  }

  async myProjects(userId: string) {
    const result = await Project.find({ userId });
    return result;
  }

  async getSingleProject(id: string) {
    const result = await Project.findById(id)
      .populate("members.member")
      .populate("teamId", "name");
    return result;
  }

  async updateProject(id: string, data: any) {
    const { name, category } = data;
    const result = await Project.findOneAndUpdate(
      { _id: id },
      { $set: { name, category } },
      { new: true }
    );
    return result;
  }

  async addMember(projectId: string, memberId: string, role: string) {
    const project = await Project.findById(projectId);

    if (!project) {
      return { message: "Project not found", success: false };
    }
    const existingMember = project.members.find(
      (member) => member.member == memberId
    );

    if (existingMember) {
      return {
        message: "Member is already part of the project",
        success: false,
      };
    }

    const result = await Project.findByIdAndUpdate(projectId, {
      $push: { members: { role, member: memberId } },
    });

    return result;
  }
}

export const ProjectService = new Service();
