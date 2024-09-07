import { IGetTeam, ITeam } from "@/interfaces/team.interface";
import Team from "@/models/team.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import mongoose, { Types } from "mongoose";
import { ProjectService } from "./project.service";
import extractCloudinaryPublicId from "@/utils/getCloudinaryFilePublicIdFromUrl";
import { deleteSingleFileFromCloudinary } from "@/utils/deletePreviousFileFromCloudinary";
import { UserSelect } from "propertySelections";
import { INotification } from "@/interfaces/notification.interface";
import { NotificationEnums } from "enums";
import { config } from "@/configurations/envConfig";
import { UserService } from "./user.service";
import { IGetUser } from "@/interfaces/user.interface";
import { IGetProject } from "@/interfaces/project.interface";
import { CacheServiceInstance } from "./cache.service";

export const teamPopulate = [
  {
    path: "activeMembers",
    model: "User",
    select: UserSelect,
  },
  {
    path: "pendingMembers",
    model: "User",
    select: UserSelect,
  },
  {
    path: "admin",
    model: "User",
    select: UserSelect,
  },
  {
    path: "leaveRequests",
    model: "User",
    select: UserSelect,
  },
  {
    path: "projects",
    model: "Project",
  },
];

class Service {
  // Temporarily using as alternative of DTO
  public teamSanitizer(team: any): IGetTeam {
    const admin = UserService.userSanitizer(team?.admin);
    const projects = team.projects?.map((project: IGetProject) =>
      ProjectService.projectSanitizer(project)
    );
    const leaveRequests = team?.leaveRequests?.map((user: IGetUser) =>
      UserService.userSanitizer(user)
    );
    const activeMembers = team?.activeMembers?.map((user: IGetUser) =>
      UserService.userSanitizer(user)
    );
    const pendingMembers = team?.pendingMembers?.map((user: IGetUser) =>
      UserService.userSanitizer(user)
    );
    return {
      id: String(team?._id),
      name: team?.name,
      category: team?.category,
      description: team?.description,
      image: team?.image || "",
      admin: admin,
      projects: projects,
      leaveRequests: leaveRequests,
      activeMembers: activeMembers,
      pendingMembers: pendingMembers,
      createdAt: team?.createdAt,
      updatedAt: team?.updatedAt,
    };
  }

  async createTeam(data: ITeam): Promise<void> {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "This team name is already exist"
      );
    }
    const newTeam = await Team.create(data);
    const populatedData = await newTeam.populate(teamPopulate);
    const dtoData = this.teamSanitizer(populatedData);
    // store the new team on cache
    await CacheServiceInstance.team.addNewTeamToCache(dtoData);
  }

  async getSingleTeam(id: string): Promise<IGetTeam> {
    const result = await Team.findById(id).populate(teamPopulate);
    const dtoData = this.teamSanitizer(result);
    return dtoData;
  }

  async getAllTeams(): Promise<any> {
    const teams = await Team.find({}).populate(teamPopulate);
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    await CacheServiceInstance.team.setAllTeamsToCache(dtoData);
    return dtoData;
  }

  async getMyTeams(adminId: string): Promise<any> {
    const teams = await Team.find({ admin: adminId }).populate(teamPopulate);
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    return dtoData;
  }

  async getJoinedTeams(memberId: string): Promise<any> {
    const teams = await Team.find({ activeMembers: memberId }).populate(
      teamPopulate
    );
    const dtoData = teams?.map((team) => this.teamSanitizer(team));
    return dtoData;
  }

  async updateTeam(
    id: string,
    data: ITeam
  ): Promise<Types.ObjectId[] | undefined> {
    const isExistTeam: any = await Team.findById(id);
    if (!isExistTeam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    const members = [
      ...(isExistTeam?.activeMembers || []),
      ...(isExistTeam?.pendingMembers || []),
    ];
    // Update the team data
    const updatedTeam: any = await Team.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    ).populate(teamPopulate);

    const team = this.teamSanitizer(updatedTeam);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(team);

    if (isExistTeam?.name !== data?.name) {
      // Notify all members about the name change
      const allMembers = [
        ...(team?.activeMembers || []),
        ...(team?.pendingMembers || []),
      ];

      await Promise.all(
        allMembers.map(async (member: IGetUser) => {
          const notifyObject: INotification = {
            title: "Team Name Updated",
            type: NotificationEnums.TEAM_UPDATED,
            receiver: member?.id,
            sender: team?.admin.id,
            content: `Dear ${member?.name}, the team name has been updated. The team "${isExistTeam?.name}" is now named "${data?.name}". Thank you for staying up to date with these changes!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject);
        })
      );

      return members;
    }
  }

  async removeAProject(teamId: string, projectId: string) {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { projects: projectId },
      },
      { new: true }
    ).populate(teamPopulate);
    const dtoData = this.teamSanitizer(updatedTeam);
    await CacheServiceInstance.team.updateTeamInCache(dtoData);
  }

  async deleteTeam(id: string): Promise<Types.ObjectId[]> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const team: any = await Team.findById(id);
      if (!team) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
      }
      const members = [
        ...(team?.activeMembers || []),
        ...(team?.pendingMembers || []),
      ];

      // // Handle Cloudinary file deletion
      const public_id = extractCloudinaryPublicId(team?.image);
      if (public_id) {
        await deleteSingleFileFromCloudinary(public_id);
      }

      // Delete the team
      await Team.findByIdAndDelete(id).session(session);

      // delete the team from cache
      await CacheServiceInstance.team.deleteTeamFromCache(id);

      // Delete related projects
      await ProjectService.deleteProjectsByTeamId(id, session);

      await Promise.all(
        members.map(async (member: any) => {
          const notifyObject: INotification = {
            title: "Team Deleted",
            type: NotificationEnums.TEAM_DELETED,
            receiver: member?._id,
            sender: team?.admin,
            content: `We're deeply grateful for your time and contributions to the team. As we say goodbye, we want to express our heartfelt thanks and admiration. Wishing you all the best in your future endeavors!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject, session);
        })
      );

      await session.commitTransaction();
      return members?.map((member: any) => member?.id);
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Team was not deleted");
    } finally {
      session.endSession();
    }
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {
    // Remove member from team
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { activeMembers: memberId },
      },
      { new: true }
    ).populate(teamPopulate);

    const team = this.teamSanitizer(updatedTeam);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(team);

    // Remove this member from projects by member ID
    await ProjectService.removeAMemberFromAllProjects(teamId, memberId);

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "You Have Been Removed from a Team",
      type: NotificationEnums.TEAM_MEMBER_REMOVED,
      content: `Thank you for the time and effort you dedicated to the team "${team?.name}" in the "${team?.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
      receiver: memberId,
      sender: team?.admin.id,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  // leave request specific methods
  async sendLeaveRequest(teamId: string, memberId: string) {
    const team: any = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: { leaveRequests: memberId },
      },
      { new: true }
    ).populate(teamPopulate);

    const dtoData = this.teamSanitizer(team);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(dtoData);

    const notifyObject: INotification = {
      title: "Team Leave Request",
      type: NotificationEnums.TEAM_LEFT,
      sender: memberId,
      receiver: team?.admin?.id,
      content: `You have received a new request from a team member to leave the team. Please review the request and take appropriate action.`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${team?.admin?.id}&name=${team?.admin?.name}&email=${team?.admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async cancelLeaveRequest(teamId: string, memberId: string) {
    const updatedTeam: any = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { leaveRequests: memberId },
      },
      { new: true }
    ).populate(teamPopulate);
    const team = this.teamSanitizer(updatedTeam);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(team);
    const notifyObject: INotification = {
      title: "Team Leave Request",
      type: NotificationEnums.TEAM_LEFT,
      sender: memberId,
      receiver: team?.admin?.id,
      content: `Team Leave Request Cancelled`,
      link: `${config.app.frontendDomain}/dashboard/leave-requests?userId=${team?.admin?.id}&name=${team?.admin?.name}&email=${team?.admin?.email}`,
    };

    // Send notification to the admin
    await NotificationService.createNotification(notifyObject);
  }

  async rejectLeaveRequest(teamId: string, memberId: string) {
    const updatedTeam: any = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { leaveRequests: memberId },
      },
      { new: true }
    ).populate(teamPopulate);
    const team = this.teamSanitizer(updatedTeam);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(team);

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Leave Request Rejected",
      type: NotificationEnums.TEAM_LEFT,
      sender: team?.admin?.id,
      receiver: memberId,
      content: `Your request to leave the team "${team?.name}" has been declined by the admin.`,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?.id}&name=${member?.name}&email=${member?.email}`,
    };

    // Send notification to the member
    await NotificationService.createNotification(notifyObject);
  }

  async acceptLeaveRequest(teamId: string, memberId: string) {
    const updatedTeam: any = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { leaveRequests: memberId, activeMembers: memberId } },
      { new: true }
    ).populate(teamPopulate);

    // Remove this member from projects by member ID
    await ProjectService.removeAMemberFromAllProjects(teamId, memberId);
    // store the updated team on cache
    const team = this.teamSanitizer(updatedTeam);
    await CacheServiceInstance.team.updateTeamInCache(team);

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title:
        "Your Leave Request Accepted And You Have Been Removed from a Team",
      type: NotificationEnums.TEAM_MEMBER_REMOVED,
      content: `Thank you for the time and effort you dedicated to the team "${team?.name}" in the "${team?.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
      receiver: memberId,
      sender: team?.admin.id,
      link: `${config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  // invitation specific methods
  async acceptInviteAndAddNewMember(
    teamId: string,
    memberId: string
  ): Promise<IGetTeam> {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: { activeMembers: memberId },
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    ).populate(teamPopulate);
    const team = this.teamSanitizer(updatedTeam);
    // store the updated team on cache
    await CacheServiceInstance.team.updateTeamInCache(team);
    return team;
  }

  async sendAddMemberToPending(
    teamId: string,
    memberId: string
  ): Promise<IGetTeam> {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $push: { pendingMembers: memberId },
      },
      { new: true }
    ).populate(teamPopulate);
    // store the updated team on cache
    const team = this.teamSanitizer(updatedTeam);
    await CacheServiceInstance.team.updateTeamInCache(team);

    return team;
  }

  async rejectAndRemoveMemberFromPending(
    teamId: string,
    memberId: string
  ): Promise<IGetTeam> {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    ).populate(teamPopulate);
    // store the updated team on cache
    const team = this.teamSanitizer(updatedTeam);
    await CacheServiceInstance.team.updateTeamInCache(team);
    return team;
  }

  async cancelAndRemoveFromPending(
    teamId: string,
    memberId: string
  ): Promise<IGetTeam> {
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    ).populate(teamPopulate);

    // store the updated team on cache
    const team = this.teamSanitizer(updatedTeam);
    await CacheServiceInstance.team.updateTeamInCache(team);

    return team;
  }

  async getMyPendingInvitations(memberId: string): Promise<IGetTeam[]> {
    const teams: any = await Team.find({ pendingMembers: memberId }).populate(
      teamPopulate
    );
    const dtoData = teams?.map((team: any) => this.teamSanitizer(team));
    return dtoData;
  }
}
export const TeamService = new Service();
