import { Types } from "mongoose";
import { IUser } from "./user.interface";

export type IMessage = {
  _id?: Types.ObjectId | string;
  poster: Types.ObjectId | IUser;
  conversationId: string;
  type: string;
  text?: string;
  images?: string[];
  files?: string[];
};

export type IMessagePoster = {
  id: string;
  name: string;
  profile_picture: string;
};

export type IMessagePayloadForSocket = {
  id: string;
  poster: IMessagePoster;
  conversationId: string;
  text: string;
  type: string;
  images: string[];
  files: string[];
  createdAt: Date;
};

export type IOneToOneMessage = {
  receiverId: string;
  message: IMessagePayloadForSocket;
};

export type ILastMessage = {
  text: string;
  files: string;
  images: string;
  createdAt: Date;
};

export type IChatFriend = {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  lastMessage: ILastMessage;
};
