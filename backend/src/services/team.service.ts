import ApiError from "../error/apiError";
import Team from "../models/team.model";

const createTeam = (data: any) => {
  const result = Team.create(data);

  return result;
};

const myTeams = async (adminId: string) => {
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
};

const allTeams = async () => {
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
};

const getTeam = async (id: string) => {
  const result = await Team.findById(id);
  if (!result) {
    throw new ApiError(404, "Team not found!");
  }
  return result;
};

const updateTeam = async (id: string, data: any) => {
  const isExistTeam = await Team.findById(id);

  if (!isExistTeam) {
    throw new ApiError(404, "Team Not Found!");
  }

  await Team.findByIdAndUpdate(id, data);
  const result = await Team.findById(id);
  return result;
};

const deleteTeam = async (id: string) => {
  const result = await Team.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(404, "Team Not Found!");
  }

  return result;
};

const removeMember = async (teamId: string, memberId: string) => {
  const result = await Team.updateOne(
    { _id: teamId },
    { $pull: { activeMembers: memberId } }
  );
  return result;
};

export const TeamService = {
  createTeam,
  myTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  allTeams,
  removeMember,
};
