import Team from "../models/team.model";

const sendInvitation = async (team_id: string, member_id: string) => {
  const result = await Team.findByIdAndUpdate(
    team_id,
    {
      $addToSet: { pendingMembers: member_id },
    },
    { new: true }
  );

  return result;
};

const rejectInvitation = async (team_id: string, member_id: string) => {
  const result = await Team.findByIdAndUpdate(
    team_id,
    {
      $pull: { pendingMembers: member_id },
    },
    { new: true }
  );

  return result;
};

const acceptInvitation = async (team_id: string, member_id: string) => {
  const result = await Team.findByIdAndUpdate(
    team_id,
    {
      $addToSet: { activeMembers: member_id },
      $pull: { pendingMembers: member_id },
    },
    { new: true }
  );

  return result;
};

export const InvitationService = {
  sendInvitation,
  rejectInvitation,
  acceptInvitation,
};
