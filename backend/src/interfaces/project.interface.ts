import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { ITeam } from "./team.interface";

type IMember = {
  role?: string;
  member: Types.ObjectId | IUser["_id"];
};

export type IProject = {
  team: Types.ObjectId | ITeam["_id"];
  user: IUser["_id"];
  name: string;
  category: string;
  members: IMember[];
  createdAt?: Date;
  updatedAt?: Date;
};
