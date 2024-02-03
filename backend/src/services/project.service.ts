import httpStatus from "http-status";
import { IProject } from "../interfaces/project.interface";
import { Project } from "../models/project.model";
import ApiError from "../shared/apiError";
import { ProjectLeaveRequest } from "../models/projectLeaveRequest.model";
import { v4 as uuidv4 } from "uuid";
import { INotification } from "../interfaces/notification.interface";
import User from "../models/user.model";
import { config } from "../config";
import { RedisCacheService } from "../middlewares/redisCache";
import { cacheExpireDates } from "../constants/redisCacheExpireDate";

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

  async assignedProjects(memberId: string): Promise<IProject[]> {
    const result = await Project.find({ "members.member": memberId });
    return result;
  }

  async getSingleProject(id: string): Promise<IProject | null> {
    const result = await Project.findById(id)
      .populate("members.member")
      .populate("team", "name");
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

    // send notification to add  new  member to project
    const member = await User.findById(memberId).select({ name: 1 });
    const admin = await User.findById(project?.user).select({ name: 1 });

    if (member && admin) {
      const notification: INotification = {
        id: uuidv4(),
        sortBy: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Removal",
          message: `You've been added to a project (${project?.name})`,
          link: `${config.app.frontendDomain}/projects?team=${project?.team}&id=${project._id}&name=${project?.name}`,
          data: {
            sendBy: admin?.name,
          },
        },
        recipient: {
          userId: member?._id,
          name: member?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(member?._id),
        notification,
        cacheExpireDates.months[1]
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

    // send notification to add  new  member to project
    const member = await User.findById(memberId).select({ name: 1 });
    const admin = await User.findById(project?.user).select({ name: 1 });

    if (member && admin) {
      const notification: INotification = {
        id: uuidv4(),
        sortBy: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Removal",
          message: `You've been removed from a project (${project?.name})`,
          link: `${config.app.frontendDomain}/projects?team=$unknown&id=unknown&name=unknown`,
          data: {
            sendBy: admin?.name,
          },
        },
        recipient: {
          userId: member?._id,
          name: member?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(member?._id),
        notification,
        cacheExpireDates.months[1]
      );
    }

    return result;
  }
}

export const ProjectService = new Service();
