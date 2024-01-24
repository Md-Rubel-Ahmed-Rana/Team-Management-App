import { Types } from "mongoose";
import { IUser } from "./user.interface";

export type ITeam = {
  _id?: Types.ObjectId;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: IUser["_id"];
  activeMembers: IUser["_id"][];
  pendingMembers: IUser["_id"][];
  createdAt?: Date;
  updatedAt?: Date;
};
