import Team from "@/models/team.model";
import { NotificationService } from "./notification.service";

class Service {
  async sendInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { pendingMembers: memberId },
      },
      { new: true }
    );

    if (result && result?.admin) {
      await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Invitation",
        `You've been invited to join Team (${result?.name})`,
        `dashboard?uId=${memberId}activeView=invitations`
      );
    }

    return result;
  }

  async pendingInvitation(memberId: string) {
    const result = await Team.find({ pendingMembers: memberId }).populate([
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

  async rejectInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    if (result && result?.admin) {
      await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Invitation",
        `Your team invitation has been rejected for (${result?.name})`,
        `dashboard?uId=${result?._id}&activeView=my-teams`
      );
    }

    return result;
  }

  async acceptInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { activeMembers: memberId },
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    if (result && result?.admin) {
      await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Invitation",
        `Your team invitation has been accepted for (${result?.name})`,
        `dashboard?uId=${result?._id}&activeView=my-teams`
      );
    }

    return result;
  }
}

export const InvitationService = new Service();
