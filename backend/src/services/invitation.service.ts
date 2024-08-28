import Team from "@/models/team.model";
import { NotificationService } from "./notification.service";
import { UserSelect } from "propertySelections";

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
      const notification = await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Invitation",
        `You've been invited to join Team (${result?.name})`,
        `dashboard?uId=${memberId}activeView=invitations`
      );

      return notification;
    }
  }

  async pendingInvitation(memberId: string) {
    const result = await Team.find({ pendingMembers: memberId }).populate([
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

  async rejectInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    if (result && result?.admin) {
      const notified = await NotificationService.sendNotification(
        memberId,
        result?.admin,
        "team_invitation",
        "Team Invitation",
        `Your team invitation has been rejected for (${result?.name})`,
        `dashboard?uId=${result?._id}&activeView=my-teams`
      );
      return notified;
    }
  }
  async cancelInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    if (result && result?.admin) {
      const notified = await NotificationService.sendNotification(
        result?.admin,
        memberId,
        "team_invitation",
        "Team Invitation",
        `Your team invitation has been cancelled for (${result?.name})`,
        `dashboard/invitations?uId=${result?._id}&activeView=my-teams`
      );
      return notified;
    }
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
      const notified = await NotificationService.sendNotification(
        memberId,
        result?.admin,
        "team_invitation",
        "Team Invitation",
        `Your team invitation has been accepted for (${result?.name})`,
        `dashboard?uId=${result?._id}&activeView=my-teams`
      );
      return notified;
    }
  }
}

export const InvitationService = new Service();
