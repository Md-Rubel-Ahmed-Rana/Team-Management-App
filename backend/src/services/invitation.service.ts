import Team from "../models/team.model";

class Service {
  public async sendInvitation(team_id: string, member_id: string) {
    const result = await Team.findByIdAndUpdate(
      team_id,
      {
        $addToSet: { pendingMembers: member_id },
      },
      { new: true }
    );

    return result;
  }

  public async pendingInvitation(member_id: string) {
    const result = await Team.find({ pendingMembers: member_id }).populate([
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

  public async rejectInvitation(team_id: string, member_id: string) {
    const result = await Team.findByIdAndUpdate(
      team_id,
      {
        $pull: { pendingMembers: member_id },
      },
      { new: true }
    );

    return result;
  }

  public async acceptInvitation(team_id: string, member_id: string) {
    const result = await Team.findByIdAndUpdate(
      team_id,
      {
        $addToSet: { activeMembers: member_id },
        $pull: { pendingMembers: member_id },
      },
      { new: true }
    );

    return result;
  }
}

export const InvitationService = new Service();
