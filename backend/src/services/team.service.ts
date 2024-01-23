import ApiError from "../error/apiError";
import Team from "../models/team.model";

class Service {
  async createTeam(data: any) {
    const isExist = await Team.findOne({ name: data?.name });
    if (isExist) {
      throw new ApiError(409, "This team already exist");
    } else {
      const result = await Team.create(data);
      return result;
    }
  }

  async myTeams(adminId: string) {
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

  async getActiveMembers(teamId: string) {
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

  async joinedTeams(memberId: string) {
    try {
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
    } catch (error) {
      console.error("Error getting teams:", error);
      throw error;
    }
  }

  async allTeams() {
    try {
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
    } catch (error) {
      console.error("Error getting teams:", error);
      throw error;
    }
  }

  async getTeam(id: string) {
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

  async getUserTeams(memberId: string) {
    const teams = await Team.find({
      $or: [{ activeMembers: memberId }, { pendingMembers: memberId }],
    });
    return teams;
  }

  async updateTeam(id: string, data: any) {
    const isExistTeam = await Team.findById(id);

    if (!isExistTeam) {
      throw new ApiError(404, "Team Not Found!");
    }

    await Team.findByIdAndUpdate(id, data);
    const result = await Team.findById(id);
    return result;
  }

  async deleteTeam(id: string) {
    const result = await Team.findByIdAndDelete(id);

    if (!result) {
      throw new ApiError(404, "Team Not Found!");
    }

    return result;
  }

  async removeMember(teamId: string, memberId: string) {
    const result = await Team.updateOne(
      { _id: teamId },
      { $pull: { activeMembers: memberId } }
    );
    return result;
  }
}
export const TeamService = new Service();
