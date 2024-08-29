import { INotification } from "@/interfaces/notification.interface";
import { IProject } from "@/interfaces/project.interface";
import { Project } from "@/models/project.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import { TeamService } from "./team.service";
import { UserService } from "./user.service";
import { TaskService } from "./task.service";
import mongoose from "mongoose";
import { TeamSelect, UserSelect } from "propertySelections";
import { NotificationEnums } from "enums";
import { config } from "@/configurations/envConfig";

class Service {
  async createProject(data: IProject): Promise<void> {
    await Project.create(data);
  }

  async myProjects(userId: string): Promise<any> {
    const result = await Project.aggregate([
      {
        $match: { user: userId },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "project",
          as: "tasks",
        },
      },
      {
        $addFields: {
          tasks: { $size: "$tasks" },
        },
      },
    ]);

    const promises = result.map(async (project) => {
      const [team, user] = await Promise.all([
        TeamService.getTeamById(project.team),
        UserService.findUserById(project.user),
      ]);

      return {
        id: project?._id,
        name: project?.name,
        category: project?.category,
        createdAt: project?.createdAt,
        user: { name: user?.name, id: user?.id },
        team: { name: team?.name, id: team?._id },
        members: project?.members?.length,
        tasks: project?.tasks,
      };
    });

    const mappedResult = await Promise.all(promises);
    return mappedResult;
  }

  async assignedProjects(memberId: string): Promise<any> {
    const result = await Project.find({ members: memberId });
    const promises = result.map(async (project) => {
      const projectId = project?._id as any;
      const teamId = project?.team as any;
      const userId = project?.user as any;
      const [team, user, tasks] = await Promise.all([
        TeamService.getTeamById(teamId),
        UserService.findUserById(userId),
        TaskService.getTasksByProjectId(projectId),
      ]);

      return {
        id: project?._id,
        name: project?.name,
        category: project?.category,
        createdAt: project?.createdAt,
        user: { name: user?.name, id: user?.id },
        team: { name: team?.name, id: team?._id },
        members: Array.isArray(project?.members) ? project.members.length : 0,
        tasks: tasks?.length,
      };
    });

    const mappedResult = await Promise.all(promises);
    return mappedResult;
  }

  async updateProject(id: string, data: Partial<IProject>): Promise<void> {
    const { name, category } = data;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const project: any = await Project.findById(id);
      const updatedProject: any = await Project.findOneAndUpdate(
        { _id: id },
        { $set: { name, category } },
        { new: true }
      )
        .populate([
          {
            path: "user",
            model: "User",
            select: UserSelect,
          },
          {
            path: "team",
            model: "Team",
            select: TeamSelect,
          },
          {
            path: "members",
            model: "User",
            select: UserSelect,
          },
        ])
        .session(session);

      if (updatedProject?.members && updatedProject?.members?.length > 0) {
        const changeDetails = [];
        if (name) changeDetails.push(`"${project?.name}" to "${name}"`);
        if (category) changeDetails.push(`category to "${category}"`);
        const changes = changeDetails.join(" and ");

        // Send notifications to all members about the updates
        await Promise.all(
          updatedProject?.members.map(async (member: any) => {
            const notifyObject: INotification = {
              title: "Project Updated",
              type: NotificationEnums.PROJECT_UPDATED,
              receiver: member._id, // member
              sender: updatedProject.user, // admin
              content: `Dear ${member.name}, the project "${project?.name}" has been updated. The ${changes} have been changed. Thank you for staying up to date with these changes!`,
              link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member._id}&name=${member.name}&email=${member.email}`,
            };
            await NotificationService.createNotification(notifyObject, session);
          })
        );
      }

      // Commit the transaction
      await session.commitTransaction();
    } catch (error) {
      // Abort the transaction in case of an error
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Project wasn't updated");
    } finally {
      // End the session
      session.endSession();
    }
  }

  async deleteProject(id: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const project = await this.getSingleProject(id);
      console.log("Single project to delete", project);
      if (project?.members && project?.members.length > 0) {
        const projectDetails = `project "${project?.name}" in the ${project?.category} category`;
        await Promise.all(
          project?.members?.map(async (member: any) => {
            const notifyObject: INotification = {
              title: "Project Deleted",
              type: NotificationEnums.PROJECT_DELETED,
              receiver: member?._id,
              sender: project?.user,
              content: `Dear ${member?.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
              link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
            };
            await NotificationService.createNotification(notifyObject, session);
          })
        );
      }

      await Project.findByIdAndDelete(id).session(session);
      await TaskService.deleteTasksByProjectId(id, session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Project wasn't deleted");
    } finally {
      session.endSession();
    }
  }

  async deleteProjectsByTeamId(
    teamId: string,
    session: mongoose.ClientSession
  ): Promise<void> {
    const deletableProjects: any = await Project.find({ team: teamId }).session(
      session
    );

    if (deletableProjects && deletableProjects?.length > 0) {
      for (const project of deletableProjects) {
        const projectId: any = project?._id;
        // Notify all members about the project deletion
        if (project?.members && project?.members?.length > 0) {
          const projectDetails = `project "${project?.name}" in the ${project?.category} category`;
          await Promise.all(
            project?.members?.map(async (member: any) => {
              const notifyObject: INotification = {
                title: "Project Deleted",
                type: NotificationEnums.PROJECT_DELETED,
                receiver: member?._id,
                sender: project?.user,
                content: `Dear ${member?.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
                link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
              };
              await NotificationService.createNotification(
                notifyObject,
                session
              );
            })
          );
        }

        await TaskService.deleteTasksByProjectId(projectId, session);
      }

      await Project.deleteMany({
        team: teamId,
      }).session(session);
    }
  }

  async getProjectByTeamId(teamId: string): Promise<any> {
    const data = await Project.find({ team: teamId }).populate([
      {
        path: "members",
        model: "User",
        select: UserSelect,
      },
    ]);

    return data;
  }

  async getSingleProject(id: string): Promise<any> {
    const result = await Project.findById(id).populate([
      {
        path: "members",
        model: "User",
        select: UserSelect,
      },
      {
        path: "team",
        model: "Team",
        select: TeamSelect,
      },
    ]);

    return result;
  }

  async addMember(projectId: string, memberId: string): Promise<void> {
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

    await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { members: memberId },
      },
      { new: true }
    );

    if (project?.user) {
      const member = await UserService.findUserById(memberId);
      const notifyObject: INotification = {
        title: "You have been added to a project",
        type: NotificationEnums.PROJECT_MEMBER_ADDED,
        content: `Congratulations! You've been added to the project "${project.name}" in the "${project.category}" category. Your skills and contributions are highly valued, and we’re excited to have you on board!`,
        link: `${config.app.frontendDomain}/projects/joined-projects?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
        sender: project?.user,
        receiver: memberId,
      };
      await NotificationService.createNotification(notifyObject);
    }
  }

  async removeMember(projectId: string, memberId: string): Promise<void> {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
    }

    await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { members: memberId },
      },
      { new: true }
    );

    // Update the most recent leave request for the project
    await ProjectLeaveRequest.findOneAndUpdate(
      { project: projectId, member: memberId },
      { $set: { status: "accepted" } }
    );

    if (project?.user) {
      const member = await UserService.findUserById(memberId);
      const notifyObject: INotification = {
        title: "You have been removed from a project",
        type: NotificationEnums.PROJECT_MEMBER_REMOVED,
        content: `You have been removed from the project "${project?.name}" in the "${project?.category}" category. We appreciate your contributions, and we wish you success in your future endeavors.`,
        link: `${config.app.frontendDomain}/projects/joined-projects?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
        sender: project?.user,
        receiver: memberId,
      };
      await NotificationService.createNotification(notifyObject);
    }
  }
}

export const ProjectService = new Service();
