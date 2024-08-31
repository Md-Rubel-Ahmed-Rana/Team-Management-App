import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ITeam } from "./team.interface";

export type IMessage = {
  _id?: Types.ObjectId | string;
  poster: Types.ObjectId | IUser;
  conversationId: Types.ObjectId | ITeam;
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
