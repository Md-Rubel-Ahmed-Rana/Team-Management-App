import Notification from "../models/notification.model";

class Service {
  public async sendNotification(data: any) {
    const newNotification = new Notification(data);
    const result = await newNotification.save();
    return result;
  }

  public async getAllNotification() {
    const result = await Notification.find({}).populate([
      {
        path: "receiverId",
        model: "User",
      },
      {
        path: "teamId",
        model: "Team",
      },
    ]);
    return result;
  }

  public async myNotification(receiverId: string) {
    const result = await Notification.find({ receiverId }).populate([
      {
        path: "receiverId",
        model: "User",
      },
      {
        path: "teamId",
        model: "Team",
      },
    ]);
    return result;
  }
}

export const NotificationService = new Service();
