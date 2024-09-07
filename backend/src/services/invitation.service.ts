import { NotificationService } from "./notification.service";
import { INotification } from "@/interfaces/notification.interface";
import { NotificationEnums } from "enums";
import { TeamService } from "./team.service";
import { config } from "@/configurations/envConfig";
import { UserService } from "./user.service";
import { IGetTeam } from "@/interfaces/team.interface";

class Service {
  async sendInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.sendAddMemberToPending(teamId, memberId);
    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "You have been invited to join a team",
      type: NotificationEnums.TEAM_INVITATION,
      content: `Exciting news! You've been invited to join the team "${team?.name}" in the "${team?.category}" category. We believe your skills and passion will be a perfect fit. Let’s achieve great things together!`,
      receiver: memberId,
      sender: team?.admin?.id,
      link: `${config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async rejectInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.rejectAndRemoveMemberFromPending(
      teamId,
      memberId
    );
    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation rejected",
      type: NotificationEnums.TEAM_INVITATION_REJECTED,
      content: `${member?.name} has declined the invitation to join your team "${team?.name}" in the "${team?.category}" category. You may want to reach out or invite someone else to fill the position.`,
      receiver: team?.admin?.id,
      sender: memberId,
      link: `${config.app.frontendDomain}/teams/details/${teamId}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team.description}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async cancelInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.cancelAndRemoveFromPending(teamId, memberId);
    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation cancelled",
      type: NotificationEnums.TEAM_INVITATION_CANCELED,
      content: `The invitation to join the team "${team?.name}" in the "${team?.category}" category has been canceled. We hope to collaborate in the future.`,
      receiver: memberId,
      sender: team?.admin?.id,
      link: `${config.app.frontendDomain}/dashboard/invitations?userId=${memberId}&name=${member?.name}&email=${member?.email}`,
    };
    await NotificationService.createNotification(notifyObject);
  }

  async acceptInvitation(teamId: string, memberId: string): Promise<void> {
    const team = await TeamService.acceptInviteAndAddNewMember(
      teamId,
      memberId
    );
    const member = await UserService.findUserById(memberId);
    const notifyObject: INotification = {
      title: "Team invitation accepted",
      type: NotificationEnums.TEAM_INVITATION_ACCEPTED,
      content: `Great news! ${member?.name} has accepted the invitation to join your team "${team?.name}" in the "${team?.category}" category. Get ready to collaborate and achieve great things together!`,
      receiver: team?.admin?.id,
      sender: memberId,
      link: `${config.app.frontendDomain}/teams/details/${teamId}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team.description}`,
    };

    await NotificationService.createNotification(notifyObject);
  }

  async pendingInvitation(memberId: string): Promise<IGetTeam[]> {
    const teams = await TeamService.getMyPendingInvitations(memberId);
    return teams;
  }
}

export const InvitationService = new Service();
