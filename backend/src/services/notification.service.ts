import { v4 as uuidv4 } from "uuid";
import { Types } from "mongoose";
import User from "@/models/user.model";
import {
  INewNotification,
  INotification,
} from "@/interfaces/notification.interface";
import { RedisCacheService } from "@/middlewares/redisCache";
import { cacheExpireDates } from "@/constants/redisCacheExpireDate";
import { config } from "@/configurations/envConfig";
import { Notification } from "@/models/notification.model";
import { UserSelect } from "propertySelections";

class Service {
  async sendNotification(
    senderId: string | Types.ObjectId,
    receiverId: string | Types.ObjectId,
    type: string,
    title: string,
    message: string,
    linkSuffix: string
  ) {
    // send notification to add  new  member to project
    const receiver = await User.findById(receiverId).select({ name: 1 });
    const sender = await User.findById(senderId).select({ name: 1 });

    if (sender && receiver) {
      const notification: INotification = {
        id: uuidv4(),
        sortBy: Date.now(),
        type,
        createdAt: new Date(),
        read: false,
        content: {
          title,
          message,
          link: `${config.app.frontendDomain}/${linkSuffix}`,
          data: {
            sendBy: sender?.name,
          },
        },
        recipient: {
          userId: receiver?._id,
          name: receiver?.name,
        },
      };

      await RedisCacheService.insertOne(
        String(receiver?._id),
        notification,
        cacheExpireDates.months[1]
      );

      return notification;
    }
  }
  async send(data: INewNotification) {
    const result = await Notification.create(data);
    const populatedResult = await result.populate([
      {
        path: "sender",
        model: "User",
        select: UserSelect,
      },
      {
        path: "receiver",
        model: "User",
        select: UserSelect,
      },
    ]);
    return populatedResult;
  }

  async getNotificationsByReceiverId(receiverId: string, limit: number = 10) {
    // Step 1: Fetch unread notifications
    const unreadNotifications = await Notification.find({
      receiver: receiverId,
      status: "unread",
    })
      .populate([
        {
          path: "sender",
          model: "User",
          select: UserSelect,
        },
      ])
      .sort({ createdAt: -1 })
      .limit(limit);

    const unreadCount = unreadNotifications.length;

    let notifications = unreadNotifications;

    // Step 2: If unread notifications are less than the limit, fetch read notifications to fill the limit
    if (unreadCount < limit) {
      const readNotifications = await Notification.find({
        receiver: receiverId,
        status: "read",
      })
        .populate([
          {
            path: "sender",
            model: "User",
            select: UserSelect,
          },
        ])
        .sort({ createdAt: -1 })
        .limit(limit - unreadCount);

      notifications = notifications.concat(readNotifications);
    }

    // Step 3: Get the total count of notifications for the user
    const total = await Notification.countDocuments({ receiver: receiverId });

    return { payload: notifications, limit, total };
  }

  async getUnreadNotificationCount(receiverId: string): Promise<number> {
    const unreadNotifications = await Notification.find({
      receiver: receiverId,
      status: "unread",
    }).countDocuments();
    return unreadNotifications;
  }

  async markAllAsRead(receiverId: string): Promise<number> {
    const unreadNotifications = await Notification.updateMany(
      {
        receiver: receiverId,
        status: "unread",
      },
      {
        $set: { status: "read" },
      }
    );
    return unreadNotifications?.modifiedCount;
  }

  async updateStatusToRead(id: string) {
    const result = await Notification.findByIdAndUpdate(
      id,
      {
        $set: { status: "read" },
      },
      { new: true }
    ).populate([
      {
        path: "sender",
        model: "User",
        select: UserSelect,
      },
      {
        path: "receiver",
        model: "User",
        select: UserSelect,
      },
    ]);
    return result;
  }
}

export const NotificationService = new Service();
