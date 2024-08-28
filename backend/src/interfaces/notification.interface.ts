import { Types } from "mongoose";

export type INotification = {
  title: string;
  content: string;
  type: string;
  status?: string;
  link?: string;
  sender: string | Types.ObjectId;
  receiver: string | Types.ObjectId;
};
