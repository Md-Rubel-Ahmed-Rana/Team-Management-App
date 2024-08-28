import Team from "@/models/team.model";
import { NotificationService } from "./notification.service";
import { UserSelect } from "propertySelections";
import { INotification } from "@/interfaces/notification.interface";
import { NotificationEnums } from "enums";
import { TeamService } from "./team.service";
import { config } from "@/configurations/envConfig";
import { UserService } from "./user.service";

class Service {
  async sendInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.getTeamById(teamId);
    await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { pendingMembers: memberId },
      },
      { new: true }
    );

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "You have been invited to join a team",
      type: NotificationEnums.TEAM_INVITATION,
      content: `Exciting news! You've been invited to join the team "${team?.name}" in the "${team?.category}" category. We believe your skills and passion will be a perfect fit. Let’s achieve great things together!`,
      receiver: memberId,
      sender: team?.admin,
      link: `${config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async rejectInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.getTeamById(teamId);
    await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation rejected",
      type: NotificationEnums.TEAM_INVITATION_REJECTED,
      content: `${member?.name} has declined the invitation to join your team "${team?.name}" in the "${team?.category}" category. You may want to reach out or invite someone else to fill the position.`,
      receiver: team?.admin,
      sender: memberId,
      link: `${config.app.frontendDomain}/teams/details/${teamId}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team.description}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async cancelInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.getTeamById(teamId);
    await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation cancelled",
      type: NotificationEnums.TEAM_INVITATION_CANCELED,
      content: `The invitation to join the team "${team?.name}" in the "${team?.category}" category has been canceled. We hope to collaborate in the future.`,
      receiver: memberId,
      sender: team?.admin,
      link: `${config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async acceptInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.getTeamById(teamId);
    await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { activeMembers: memberId },
        $pull: { pendingMembers: memberId },
      },
      { new: true }
    );

    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation accepted",
      type: NotificationEnums.TEAM_INVITATION_ACCEPTED,
      content: `Great news! ${member?.name} has accepted the invitation to join your team "${team?.name}" in the "${team?.category}" category. Get ready to collaborate and achieve great things together!`,
      receiver: team?.admin,
      sender: memberId,
      link: `${config.app.frontendDomain}/teams/details/${teamId}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team.description}`,
    };
    await NotificationService.createNotification(notifyObject);
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
}

export const InvitationService = new Service();
