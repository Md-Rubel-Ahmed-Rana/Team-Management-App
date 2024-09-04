import { Types } from "mongoose";
import { IGetUser } from "./user.interface";

export type IProject = {
  team: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  category: string;
  members: Types.ObjectId[];
  leaveRequests: Types.ObjectId[];
  tasks: number;
};

export type IGetProject = {
  id: string;
  team: string;
  user: string;
  name: string;
  category: string;
  members: IGetUser[];
  leaveRequests: IGetUser[];
  tasks: number;
  createdAt: Date;
  updatedAt: Date;
};
