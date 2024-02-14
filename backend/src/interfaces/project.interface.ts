import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ITeam } from "./team.interface";

export type IProject = {
  _id?: Types.ObjectId;
  team: Types.ObjectId | ITeam["_id"];
  user: Types.ObjectId | IUser["_id"];
  name: string;
  category: string;
  members: Types.ObjectId | IUser["_id"];
  createdAt?: Date;
  updatedAt?: Date;
};
