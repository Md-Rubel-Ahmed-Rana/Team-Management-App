import { ITeam } from "@/interfaces/team.interface";
import { Project } from "@/models/project.model";
import Team from "@/models/team.model";
import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";
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

class Service {
  async createTeam(data: ITeam): Promise<any> {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, "This team already exist");
    } else {
      const result = await Team.create(data);
      const populatedResult = await result.populate([
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
      ]);
      return populatedResult;
    }
  }

  async getMyTeamListForDropdown(adminId: string): Promise<any> {
    const result = await Team.find({ admin: adminId }).select({ name: 1 });
    return result;
  }

  async getActiveMembers(teamId: string): Promise<any> {
    const result = await Team.findById(teamId)
      .select({ activeMembers: 1, name: 1 })
      .populate([
        {
          path: "activeMembers",
          model: "User",
          select: UserSelect,
        },
      ]);

    return result;
  }

  async getMyTeamsForCard(adminId: string): Promise<any> {
    const objectIdAdmin = new Types.ObjectId(adminId);
    const result = await Team.aggregate([
      {
        $match: { admin: objectIdAdmin },
      },
      {
        $addFields: {
          activeMembers: { $size: "$activeMembers" },
          pendingMembers: { $size: "$pendingMembers" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          category: 1,
          description: 1,
          image: 1,
          admin: 1,
          activeMembers: 1,
          pendingMembers: 1,
          projects: 1,
        },
      },
    ]);

    const promises = result.map(async (team) => {
      const [projects] = await Promise.all([
        ProjectService.getProjectByTeamId(team?.id),
      ]);

      return {
        id: team?.id,
        name: team?.name,
        category: team?.category,
        description: team?.description,
        image: team?.image,
        admin: team?.admin,
        activeMembers: team?.activeMembers,
        pendingMembers: team?.pendingMembers,
        projects: projects?.length,
      };
    });

    const mappedResult = await Promise.all(promises);
    return mappedResult;
  }

  async getJoinedTeamsForCard(memberId: string): Promise<any> {
    const objectIdMember = new Types.ObjectId(memberId);
    const result = await Team.aggregate([
      {
        $match: { activeMembers: objectIdMember },
      },
      {
        $addFields: {
          activeMembers: { $size: "$activeMembers" },
          pendingMembers: { $size: "$pendingMembers" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          category: 1,
          description: 1,
          image: 1,
          admin: 1,
          activeMembers: 1,
          pendingMembers: 1,
          projects: 1,
        },
      },
    ]);

    const promises = result.map(async (team) => {
      const [projects] = await Promise.all([
        ProjectService.getProjectByTeamId(team?.id),
      ]);

      return {
        id: team?.id,
        name: team?.name,
        category: team?.category,
        description: team?.description,
        image: team?.image,
        admin: team?.admin,
        activeMembers: team?.activeMembers,
        pendingMembers: team?.pendingMembers,
        projects: projects?.length,
      };
    });

    const mappedResult = await Promise.all(promises);
    return mappedResult;
  }

  async getSingleTeamWithDetails(teamId: string) {
    const team = await Team.findById(teamId).populate([
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
    ]);

    const projects = await ProjectService.getProjectByTeamId(team?.id);

    const teamDetails = {
      id: team?.id,
      name: team?.name,
      category: team?.category,
      description: team?.description,
      image: team?.image,
      admin: team?.admin,
      activeMembers: team?.activeMembers,
      pendingMembers: team?.pendingMembers,
      projects: projects,
    };
    return teamDetails;
  }

  async getTeamById(id: string): Promise<any> {
    const result = await Team.findById(id).populate([
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
    ]);
    return result;
  }

  async getTeam(id: string): Promise<any> {
    const result = await Team.findById(id).populate([
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
    ]);
    return result;
  }

  async updateTeam(id: string, data: ITeam): Promise<void> {
    const isExistTeam: any = await Team.findById(id);
    if (!isExistTeam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    // Update the team data
    const team: any = await Team.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    ).populate([
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
    ]);

    if (isExistTeam?.name !== data?.name) {
      // Notify all members about the name change
      const allMembers = [
        ...(team?.activeMembers || []),
        ...(team?.pendingMembers || []),
      ];

      await Promise.all(
        allMembers.map(async (member: any) => {
          const notifyObject: INotification = {
            title: "Team Name Updated",
            type: NotificationEnums.TEAM_UPDATED,
            receiver: member?._id,
            sender: team?.admin,
            content: `Dear ${member?.name}, the team name has been updated. The team "${isExistTeam?.name}" is now named "${data?.name}". Thank you for staying up to date with these changes!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject);
        })
      );
    }
  }

  async deleteTeam(id: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const getTeam: any = await Team.findById(id);
      if (!getTeam) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
      }

      // Handle Cloudinary file deletion
      const public_id = extractCloudinaryPublicId(getTeam?.image);
      if (public_id) {
        await deleteSingleFileFromCloudinary(public_id);
      }

      // Delete the team
      await Team.findByIdAndDelete(id).session(session);

      // Delete related projects
      await ProjectService.deleteProjectsByTeamId(id, session);

      // Create notifications for all members
      const members = [
        ...(getTeam?.activeMembers || []),
        ...(getTeam?.pendingMembers || []),
      ];

      await Promise.all(
        members.map(async (member: any) => {
          const notifyObject: INotification = {
            title: "Team Deleted",
            type: NotificationEnums.TEAM_DELETED,
            receiver: member?._id,
            sender: getTeam?.admin,
            content: `We're deeply grateful for your time and contributions to the team. As we say goodbye, we want to express our heartfelt thanks and admiration. Wishing you all the best in your future endeavors!`,
            link: `${config.app.frontendDomain}/teams/joined-teams?userId=${member?._id}&name=${member?.name}&email=${member?.email}`,
          };
          await NotificationService.createNotification(notifyObject, session);
        })
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Team was not deleted");
    } finally {
      session.endSession();
    }
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {
    // Remove member from team
    await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } }
    );

    const team = await Team.findById(teamId);

    // Remove this member from projects by member ID
    await Project.updateMany(
      { team: teamId },
      { $pull: { members: { memberId: memberId } } }
    );

    // Update leave request for team
    await TeamLeaveRequest.findOneAndUpdate(
      { team: teamId, member: memberId },
      { $set: { status: "accepted" } }
    );

    if (team && team?.admin) {
      const member = await UserService.findUserById(memberId);
      const notifyObject: INotification = {
        title: "You Have Been Removed from a Team",
        type: NotificationEnums.TEAM_MEMBER_REMOVED,
        content: `Thank you for the time and effort you dedicated to the team "${team?.name}" in the "${team?.category}" category. Your contributions have been greatly appreciated. As we part ways, we wish you all the best in your future endeavors. If you have any questions or concerns, please feel free to reach out to the team admin.`,
        receiver: memberId,
        sender: team?.admin,
        link: `${config.app.frontendDomain}/teams/joined-teams?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
      };
      await NotificationService.createNotification(notifyObject);
    }
  }
}
export const TeamService = new Service();
