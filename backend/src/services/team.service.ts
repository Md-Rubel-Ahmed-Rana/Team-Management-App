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

  async updateTeam(id: string, data: ITeam): Promise<any> {
    const isExistTeam = await Team.findById(id);
    if (!isExistTeam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    const result = await Team.findByIdAndUpdate(
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

    return result;
  }

  async deleteTeam(id: string): Promise<any> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const getTeam = await Team.findById(id);
      if (getTeam) {
        const public_id = extractCloudinaryPublicId(getTeam?.image);
        if (public_id) {
          await deleteSingleFileFromCloudinary(public_id);
        }
      }

      const result = await Team.findByIdAndDelete(id).session(session);

      if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
      }

      await ProjectService.deleteProjectsByTeamId(id, session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(httpStatus.BAD_REQUEST, "Team was't not deleted");
    } finally {
      session.endSession();
    }
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {
    // remove from team
    await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } }
    );

    const result = await Team.findById(teamId).select({ name: 1, admin: 1 });

    // remove this member from projects by member id //
    await Project.updateMany(
      { team: teamId },
      { $pull: { members: { memberId: memberId } } }
    );

    // update leave request for team
    await TeamLeaveRequest.findOneAndUpdate(
      { team: teamId },
      { $set: { status: "accepted" } }
    ).sort({ createdAt: -1 });

    if (result && result?.admin) {
      await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Removal",
        `You've been removed from Team (${result?.name})`,
        `dashboard?uId=${memberId}activeView=joined-teams`
      );
    }
  }
}
export const TeamService = new Service();
