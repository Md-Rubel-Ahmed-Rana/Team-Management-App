import { Types } from "mongoose";
import { config } from "../config";
import { INotification } from "../interfaces/notification.interface";
import { RedisCacheService } from "../middlewares/redisCache";
import Team from "../models/team.model";
import User from "../models/user.model";

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

    if (member) {
      const notification: INotification = {
        id: Date.now(),
        type: "team_invitation",
        createdAt: new Date(),
        read: false,
        content: {
          title: "Team Invitation",
          message: `You've been invited to join Team (${result?.name})`,
          link: `${config.app.frontendDomain}/dashboard?activeView=invitations`,
          data: {
            invitedBy: "Team admin",
          },
        },
        recipient: {
          userId: member?._id,
          name: member?.name,
        },
      };
      const expireDate = 2592000; // 30 days | 1 month

      await RedisCacheService.insertOne(
        String(member?._id),
        notification,
        expireDate
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

    return result;
  }
}

export const InvitationService = new Service();

const notifications = [
  {
    type: "task_assignment",
    createdAt: new Date(),
    read: false,
    content: {
      title: "Task Assignment",
      message: "You've been assigned a new task in Project [project name]",
      link: "/projects/project-x/tasks/task-123",
      data: {
        taskName: "Complete Documentation",
        dueDate: "2022-02-15",
      },
    },
    recipient: {
      userId: "user-123",
      username: "john_doe",
    },
  },
  {
    id: "2",
    type: "project_update",
    createdAt: 1644048000000, // Timestamp for February 1, 2022
    read: false,
    content: {
      title: "Project Update",
      message: "Project Y has a new status update",
      link: "/projects/project-y",
      data: {
        status: "In Progress",
        lastUpdatedBy: "user-456",
      },
    },
    recipient: {
      userId: "user-789",
      username: "jane_doe",
    },
  },
  {
    id: "3",
    type: "team_invitation",
    createdAt: 1644220800000, // Timestamp for February 2, 2022
    read: false,
    content: {
      title: "Team Invitation",
      message: "You've been invited to join Team [team name]",
      link: "/teams/team-z",
      data: {
        invitedBy: "user-789",
      },
    },
    recipient: {
      userId: "user-123",
      username: "john_doe",
    },
  },
  {
    id: "4",
    type: "notification_type",
    createdAt: 1644393600000, // Timestamp for February 3, 2022
    read: false,
    content: {
      title: "Generic Notification",
      message: "This is a generic notification with no specific type",
      link: "/path/to/unknown/resource",
      data: {
        additionalInfo: "Any relevant data can be included",
      },
    },
    recipient: {
      userId: "user-456",
      username: "bob_smith",
    },
  },
  {
    id: "5",
    type: "task_completed",
    createdAt: 1644566400000, // Timestamp for February 4, 2022
    read: false,
    content: {
      title: "Task Completed",
      message: "The task 'Review Design Mockups' has been completed",
      link: "/projects/project-a/tasks/task-789",
      data: {
        completedBy: "user-123",
      },
    },
    recipient: {
      userId: "user-789",
      username: "jane_doe",
    },
  },
];
