import { Types } from "mongoose";

export type INotification = {
  id: string;
  type: string;
  sortBy: number;
  createdAt: Date;
  read: boolean;
  content: {
    title: string;
    message: string;
    link: string;
    data: {
      sendBy: string;
    };
  };
  recipient: {
    userId: string | Types.ObjectId;
    name: string;
  };
};

export type INewNotification = {
  title: string;
  content: string;
  type: string;
  status: string;
  link?: string;
  sender: string | Types.ObjectId;
  receiver: string | Types.ObjectId;
};
