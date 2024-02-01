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
