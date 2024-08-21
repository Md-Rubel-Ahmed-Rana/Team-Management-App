import { ITeam } from "@/interfaces/team.interface";
import { Project } from "@/models/project.model";
import Team from "@/models/team.model";
import { TeamLeaveRequest } from "@/models/teamLeaveRequest.model";
import ApiError from "@/shared/apiError";
import httpStatus from "http-status";
import { NotificationService } from "./notification.service";
import { mapper } from "../mapper";
import { TeamEntity } from "@/entities/team.entity";
import { ModelIdentifier } from "@automapper/core";
import { CreateTeamDTO } from "@/dto/team/create";
import { GetTeamDTO } from "@/dto/team/get";
import { UserEntity } from "@/entities/user.entity";
import { GetUserDTO } from "@/dto/user/get";
import { UpdateTeamDTO } from "@/dto/team/update";
import { DeleteTeamDTO } from "@/dto/team/delete";
import { Types } from "mongoose";
import { ProjectService } from "./project.service";

class Service {
  async createTeam(data: ITeam): Promise<CreateTeamDTO> {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, "This team already exist");
    } else {
      const result = await Team.create(data);
      const mappedData = mapper.map(
        result,
        TeamEntity as ModelIdentifier,
        CreateTeamDTO
      );
      return mappedData;
    }
  }

  async myTeams(adminId: string): Promise<GetTeamDTO[]> {
    const result = await Team.find({ admin: adminId }).populate([
      {
        path: "activeMembers",
        model: "User",
      },
      {
        path: "pendingMembers",
        model: "User",
      },
      {
        path: "admin",
        model: "User",
      },
    ]);
    const mappedData = mapper.mapArray(
      result,
      TeamEntity as ModelIdentifier,
      GetTeamDTO
    );
    return mappedData;
  }

  async joinedTeams(memberId: string): Promise<GetTeamDTO[]> {
    const result = await Team.find({ activeMembers: memberId }).populate([
      {
        path: "activeMembers",
        model: "User",
      },
      {
        path: "pendingMembers",
        model: "User",
      },
      {
        path: "admin",
        model: "User",
      },
    ]);
    const mappedData = mapper.mapArray(
      result,
      TeamEntity as ModelIdentifier,
      GetTeamDTO
    );
    return mappedData;
  }

  async getActiveMembers(teamId: string): Promise<GetUserDTO[] | undefined> {
    const result = await Team.findById(teamId)
      .select({ activeMembers: 1 })
      .populate([
        {
          path: "activeMembers",
          model: "User",
        },
      ]);
    const members = result?.activeMembers;
    if (members && members?.length > 0) {
      const mappedData = mapper.mapArray(
        members,
        UserEntity as ModelIdentifier,
        GetUserDTO
      );
      return mappedData;
    }
  }

  async getMyTeamsForCard(adminId: string) {
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

  async getJoinedTeamsForCard(memberId: string) {
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
    const userProjection = {
      name: 1,
      profile_picture: 1,
      email: 1,
    };
    const team = await Team.findById(teamId).populate([
      {
        path: "activeMembers",
        model: "User",
        select: userProjection,
      },
      {
        path: "pendingMembers",
        model: "User",
        select: userProjection,
      },
      {
        path: "admin",
        model: "User",
        select: userProjection,
      },
    ]);

    const projects = await ProjectService.getProjectByTeamId(team?.id);

    return {
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
  }

  async getTeamById(id: string): Promise<ITeam> {
    const result = await Team.findById(id);
    if (!result) {
      throw new ApiError(404, "Team not found!");
    }
    return result;
  }
  async getTeam(id: string): Promise<GetTeamDTO> {
    const result = await Team.findById(id).populate([
      {
        path: "activeMembers",
        model: "User",
      },
      {
        path: "pendingMembers",
        model: "User",
      },
      {
        path: "admin",
        model: "User",
      },
    ]);
    if (!result) {
      throw new ApiError(404, "Team not found!");
    }
    const mappedData = mapper.map(
      result,
      TeamEntity as ModelIdentifier,
      GetTeamDTO
    );
    return mappedData;
  }

  async updateTeam(id: string, data: ITeam): Promise<UpdateTeamDTO | null> {
    console.log(id, data);
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
      },
      {
        path: "pendingMembers",
        model: "User",
      },
      {
        path: "admin",
        model: "User",
      },
    ]);
    const mappedData = mapper.map(
      result,
      TeamEntity as ModelIdentifier,
      UpdateTeamDTO
    );
    return mappedData;
  }

  async deleteTeam(id: string): Promise<DeleteTeamDTO | null> {
    const result = await Team.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    const mappedData = mapper.map(
      result,
      TeamEntity as ModelIdentifier,
      DeleteTeamDTO
    );
    return mappedData;
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
