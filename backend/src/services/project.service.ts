import { INotification } from "@/interfaces/notification.interface";
import { IGetProject, IProject } from "@/interfaces/project.interface";
import { Project } from "@/models/project.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { ProjectLeaveRequest } from "@/models/projectLeaveRequest.model";
import { UserService } from "./user.service";
import { TaskService } from "./task.service";
import mongoose, { Types } from "mongoose";
import { TeamSelect, UserSelect } from "propertySelections";
import { NotificationEnums } from "enums";
import { config } from "@/configurations/envConfig";
import { IGetUser } from "@/interfaces/user.interface";

class Service {
  public projectSanitizer(project: any): IGetProject {
    const members = project?.members?.map((user: IGetUser) =>
      UserService.userSanitizer(user)
    );
    const leaveRequests = project?.leaveRequests?.map((user: IGetUser) =>
      UserService.userSanitizer(user)
    );
    return {
      id: String(project?._id),
      team: project?.team,
      user: project?.user,
      name: project?.name,
      category: project?.category,
      members: members || [],
      leaveRequests: leaveRequests || [],
      tasks: project?.tasks || 0,
      createdAt: project?.createdAt,
      updatedAt: project?.updatedAt,
    };
  }

  async createProject(data: IProject): Promise<void> {
    const newProject = await Project.create(data);
    const dtoProject = this.projectSanitizer(newProject);
    // keep/store the project on cache
  }

  async getAllProjects(): Promise<IGetProject[]> {
    const projects = await Project.find({});
    const dtoData = projects?.map((project) => this.projectSanitizer(project));
    return dtoData;
  }

  async myProjects(userId: string): Promise<IGetProject[]> {
    const projects = await Project.find({ user: userId });
    const dtoData = projects?.map((project) => this.projectSanitizer(project));
    return dtoData;
  }

  async assignedProjects(memberId: string): Promise<IGetProject[]> {
    const projects = await Project.find({ members: memberId });
    const dtoData = projects?.map((project) => this.projectSanitizer(project));
    return dtoData;
  }

  async updateProject(
    id: string,
    data: Partial<IProject>
  ): Promise<Types.ObjectId[]> {
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

      const dtoData = this.projectSanitizer(updatedProject);

      if (dtoData?.members && dtoData?.members?.length > 0) {
        const changeDetails = [];
        if (name) changeDetails.push(`"${project?.name}" to "${name}"`);
        if (category) changeDetails.push(`category to "${category}"`);
        const changes = changeDetails.join(" and ");

        // Send notifications to all members about the updates
        await Promise.all(
          dtoData?.members.map(async (member: IGetUser) => {
            const notifyObject: INotification = {
              title: "Project Updated",
              type: NotificationEnums.PROJECT_UPDATED,
              receiver: member?.id,
              sender: updatedProject?.user,
              content: `Dear ${member?.name}, the project "${project?.name}" has been updated. The ${changes} have been changed. Thank you for staying up to date with these changes!`,
              link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
            };
            await NotificationService.createNotification(notifyObject, session);
          })
        );
      }
      // Commit the transaction
      await session.commitTransaction();

      // keep the updated project on cache
      return project?.members;
    } catch (error) {
      // Abort the transaction in case of an error
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Project wasn't updated");
    } finally {
      // End the session
      session.endSession();
    }
  }

  async deleteProject(id: string): Promise<string[]> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const project: IGetProject = await this.getSingleProjectById(id);
      if (project?.members && project?.members.length > 0) {
        const projectDetails = `project "${project?.name}" in the ${project?.category} category`;
        await Promise.all(
          project?.members?.map(async (member) => {
            const notifyObject: INotification = {
              title: "Project Deleted",
              type: NotificationEnums.PROJECT_DELETED,
              receiver: member?.id,
              sender: project?.user,
              content: `Dear ${member?.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
              link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
            };
            await NotificationService.createNotification(notifyObject, session);
          })
        );
      }

      await Project.findByIdAndDelete(id).session(session);
      await TaskService.deleteTasksByProjectId(id, session);
      await session.commitTransaction();

      // delete this project from cache
      return project?.members.map((member) => member?.id);
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
    const projects: IGetProject[] = deletableProjects?.map((project: any) =>
      this.projectSanitizer(project)
    );
    if (projects && projects?.length > 0) {
      for (const project of projects) {
        // Notify all members about the project deletion
        if (project?.members && project?.members?.length > 0) {
          const projectDetails = `project "${project?.name}" in the ${project?.category} category`;
          await Promise.all(
            project?.members?.map(async (member) => {
              const notifyObject: INotification = {
                title: "Project Deleted",
                type: NotificationEnums.PROJECT_DELETED,
                receiver: member?.id,
                sender: project?.user,
                content: `Dear ${member?.name}, the ${projectDetails} has been successfully completed and removed from the system. We truly appreciate your hard work and dedication throughout this project. We look forward to collaborating with you on future projects!`,
                link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
              };
              await NotificationService.createNotification(
                notifyObject,
                session
              );
            })
          );
        }

        await TaskService.deleteTasksByProjectId(project?.id, session);
      }
      await Project.deleteMany({
        team: teamId,
      }).session(session);

      // update projects on cache
    }
  }

  async getProjectByTeamId(teamId: string): Promise<IGetProject[]> {
    const projects = await Project.find({ team: teamId }).populate([
      {
        path: "members",
        model: "User",
        select: UserSelect,
      },
    ]);
    const dtoData = projects?.map((project) => this.projectSanitizer(project));
    return dtoData;
  }

  async getSingleProjectById(id: string): Promise<IGetProject> {
    const result = await Project.findById(id).populate([
      {
        path: "members",
        model: "User",
        select: UserSelect,
      },
    ]);

    const dtoData = this.projectSanitizer(result);
    return dtoData;
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

    // update member count on cache
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

    // update member count on cache
  }

  async sendLeaveRequest(projectId: string, memberId: string) {
    const project: any = await Project.findByIdAndUpdate(projectId, {
      $push: { leaveRequests: memberId },
    });
    const member = await UserService.findUserById(memberId);
    const admin = await UserService.findUserById(project?.user);
    const notifyObject: INotification = {
      title: "Project Leave Request",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: member.id,
      receiver: admin.id,
      content: `Dear ${admin?.name}, ${member?.name} has requested to leave the project "${project?.name}" in the ${project?.category} category. Please review their request and take the necessary actions.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${
        admin?.id || admin?.id
      }&name=${admin?.name}&email=${admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }
  async cancelLeaveRequest(projectId: string, memberId: string) {
    const project: any = await Project.findByIdAndUpdate(projectId, {
      $pull: { leaveRequests: memberId },
    });
    const member = await UserService.findUserById(memberId);
    const admin = await UserService.findUserById(project?.user);
    const notifyObject: INotification = {
      title: "Project Leave Request Cancelled",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: member.id,
      receiver: admin.id,
      content: `Dear ${admin?.name}, ${member?.name} has cancelled  leave request "${project?.name}" in the ${project?.category} category. And decided not to leave from this project.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${admin?.id}&name=${admin?.name}&email=${admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async acceptLeaveRequest(projectId: string, memberId: string) {
    const project: any = await Project.findByIdAndUpdate(projectId, {
      $pull: { leaveRequests: memberId, members: memberId },
    });
    const member = await UserService.findUserById(memberId);
    const admin = await UserService.findUserById(project?.user);
    const notifyObject: INotification = {
      title: "Project Leave Request Accepted",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: admin?.id,
      receiver: member?.id,
      content: `Dear ${member?.name}, ${admin?.name} has accepted your leave request "${project?.name}" in the ${project?.category} category. And decided to leave and remove you from this project.`,
      link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);

    // update project member count on cache
  }

  async rejectLeaveRequest(projectId: string, memberId: string) {
    const project: any = await Project.findByIdAndUpdate(projectId, {
      $pull: { leaveRequests: memberId },
    });
    const member = await UserService.findUserById(memberId);
    const admin = await UserService.findUserById(project?.user);
    const notifyObject: INotification = {
      title: "Project Leave Request Rejected",
      type: NotificationEnums.PROJECT_LEAVE_REQUEST,
      sender: admin?.id,
      receiver: member?.id,
      content: `Dear ${member?.name}, ${admin?.name} has rejected leave request "${project?.name}" in the ${project?.category} category. And decided not to leave from this project.`,
      link: `${config.app.frontendDomain}/projects/joined-projects?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }
}

export const ProjectService = new Service();
