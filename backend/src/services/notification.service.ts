import { INotification } from "@/interfaces/notification.interface";
import { Notification } from "@/models/notification.model";
import mongoose from "mongoose";
import { UserSelect } from "propertySelections";

class Service {
  async createNotification(
    notificationObject: INotification,
    session?: mongoose.ClientSession
  ) {
    const result = await Notification.create([notificationObject], { session });
    const populatedResult = await result[0].populate([
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

    console.log("New notification", populatedResult);

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
