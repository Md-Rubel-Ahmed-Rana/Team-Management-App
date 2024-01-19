import Notification from "../models/notification.model";

const sendNotification = async (data: any) => {
  const newNotification = new Notification(data);
  const result = await newNotification.save();
  return result;
};

const getAllNotification = async () => {
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
};

const myNotification = async (receiverId: string) => {
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
};

export const NotificationService = {
  sendNotification,
  getAllNotification,
  myNotification,
};
