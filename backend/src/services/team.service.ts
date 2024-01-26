import httpStatus from "http-status";
import Team from "../models/team.model";
import ApiError from "../shared/apiError";
import { ITeam } from "../interfaces/team.interface";
import { Project } from "../models/project.model";
import { TeamLeaveRequest } from "../models/teamLeaveRequest.model";

class Service {
  async createTeam(data: ITeam): Promise<ITeam> {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, "This team already exist");
    } else {
      const result = await Team.create(data);
      return result;
    }
  }

  async myTeams(adminId: string): Promise<ITeam[]> {
    try {
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
          select: [
            "name",
            "profile_picture",
            "email",
            "department",
            "designation",
            "createdAt",
            "updatedAt",
          ],
        },
      ]);

      return result;
    } catch (error) {
      console.error("Error getting teams:", error);
      throw error;
    }
  }

  async getActiveMembers(
    teamId: string
  ): Promise<{ _id: string; name: string }[] | undefined> {
    const result = await Team.findById(teamId)
      .select({ activeMembers: 1 })
      .populate([
        {
          path: "activeMembers",
          model: "User",
        },
      ]);
    const members = result?.activeMembers.map((member: any) => ({
      _id: member._id,
      name: member?.name,
    }));
    return members;
  }

  async joinedTeams(memberId: string): Promise<ITeam[]> {
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
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
          "createdAt",
          "updatedAt",
        ],
      },
    ]);
    return result;
  }

  async allTeams(): Promise<ITeam[]> {
    const result = await Team.find().populate([
      {
        path: "activeMembers",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
          "createdAt",
          "updatedAt",
        ],
      },
      {
        path: "pendingMembers",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
          "createdAt",
          "updatedAt",
        ],
      },
      {
        path: "admin",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
          "createdAt",
          "updatedAt",
        ],
      },
    ]);
    return result;
  }

  async getTeam(id: string): Promise<ITeam> {
    const result = await Team.findById(id).populate([
      {
        path: "activeMembers",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
        ],
      },
      {
        path: "pendingMembers",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
        ],
      },
      {
        path: "admin",
        model: "User",
        select: [
          "name",
          "profile_picture",
          "email",
          "department",
          "designation",
        ],
      },
    ]);
    if (!result) {
      throw new ApiError(404, "Team not found!");
    }
    return result;
  }

  async getUserTeams(memberId: string): Promise<ITeam[]> {
    const teams = await Team.find({
      $or: [{ activeMembers: memberId }, { pendingMembers: memberId }],
    });
    return teams;
  }

  async updateTeam(id: string, data: ITeam): Promise<ITeam | null> {
    const isExistTeam = await Team.findById(id);

    if (!isExistTeam) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    await Team.findByIdAndUpdate(id, data);
    const result = await Team.findById(id);
    return result;
  }

  async deleteTeam(id: string): Promise<ITeam | null> {
    const result = await Team.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "Team Not Found!");
    }

    return result;
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {

    // remove from team
    await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } },
      { new: true }
    );

    // remove from projects
    const projects = await Project.find({ "members.member": memberId });
    const updatePromises = projects.map(async (project) => {
      project.members = project.members.filter(
        (member: any) => member?.member.toString() !== memberId
      );
      return project.save();
    });
    await Promise.all(updatePromises);

    // update leave request for team
    await TeamLeaveRequest.findOneAndUpdate({team: teamId}, {$set: {status: "accepted"}}).sort({createdAt: -1})
  }
}
export const TeamService = new Service();
