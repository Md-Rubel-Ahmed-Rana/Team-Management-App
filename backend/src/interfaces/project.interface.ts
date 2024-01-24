import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ITeam } from "./team.interface";

type IMember = {
  role?: string;
  member: Types.ObjectId | IUser["_id"];
};

export type IProject = {
  _id?: Types.ObjectId;
  team: Types.ObjectId | ITeam["_id"];
  user: Types.ObjectId | IUser["_id"];
  name: string;
  category: string;
  members: IMember[];
  createdAt?: Date;
  updatedAt?: Date;
};
