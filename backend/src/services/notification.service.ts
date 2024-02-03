import { INotification } from "../interfaces/notification.interface";
import User from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import { RedisCacheService } from "../middlewares/redisCache";
import { cacheExpireDates } from "../constants/redisCacheExpireDate";
import { config } from "../config";
import { Types } from "mongoose";

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
    }
  }
}

export const NotificationService = new Service();
