import { config } from "../config";
import { INotification } from "../interfaces/notification.interface";
import { RedisCacheService } from "../middlewares/redisCache";
import Team from "../models/team.model";
import User from "../models/user.model";
import { cacheExpireDates } from "../constants/redisCacheExpireDate";

class Service {
  async sendInvitation(teamId: string, memberId: string) {
    const result = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { pendingMembers: memberId },
      },
      { new: true }
    );

    // send notification to invited user and store it on cache
    const member = await User.findById(memberId).select({ name: 1 });
    const admin = await User.findById(result?.admin).select({ name: 1 });

    if (member && admin) {
      const notification: INotification = {
        id: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Invitation",
          message: `You've been invited to join Team (${result?.name})`,
          link: `${config.app.frontendDomain}/dashboard?uId=${member?._id}activeView=invitations`,
          data: {
            sendBy: admin?.name,
          },
        },
        recipient: {
          userId: member?._id,
          name: member?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(member?._id),
        notification,
        cacheExpireDates.months[1]
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

    const member = await User.findById(memberId).select({ name: 1 });
    const admin = await User.findById(result?.admin).select({ name: 1 });

    if (member && admin) {
      const notification: INotification = {
        id: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Invitation",
          message: `Your team invitation has been rejected for (${result?.name})`,
          link: `${config.app.frontendDomain}/dashboard?uId=${admin?._id}&activeView=my-teams`,
          data: {
            sendBy: member?.name,
          },
        },
        recipient: {
          userId: admin?._id,
          name: admin?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(admin?._id),
        notification,
        cacheExpireDates.months[1]
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

    const member = await User.findById(memberId).select({ name: 1 });
    const admin = await User.findById(result?.admin).select({ name: 1 });

    if (member && admin) {
      const notification: INotification = {
        id: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Invitation",
          message: `Your team invitation has been accepted for (${result?.name})`,
          link: `${config.app.frontendDomain}/dashboard?uId=${admin?._id}&activeView=my-teams`,
          data: {
            sendBy: member?.name,
          },
        },
        recipient: {
          userId: admin?._id,
          name: admin?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(admin?._id),
        notification,
        cacheExpireDates.months[1]
      );
    }

    return result;
  }
}

export const InvitationService = new Service();
