import { Types } from "mongoose";
import { IUser } from "./user.interface";

export type IMessage = {
  poster: Types.ObjectId | IUser;
  type: string;
  text?: string;
  images?: string[];
  files?: string[];
  links?: string[];
};
