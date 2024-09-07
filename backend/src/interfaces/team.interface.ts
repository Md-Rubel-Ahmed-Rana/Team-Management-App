import { Types } from "mongoose";
import { IGetUser, IUser } from "./user.interface";
import { IGetProject } from "./project.interface";

export type ITeam = {
  name: string;
  category: string;
  description: string;
  image: string;
  admin: Types.ObjectId;
  projects: Types.ObjectId[];
  leaveRequests: Types.ObjectId[];
  activeMembers: Types.ObjectId[];
  pendingMembers: Types.ObjectId[];
};

export type IGetTeam = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: IGetUser;
  projects: IGetProject[];
  leaveRequests: IGetUser[];
  activeMembers: IGetUser[];
  pendingMembers: IGetUser[];
  createdAt: Date;
  updatedAt: Date;
};
