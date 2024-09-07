import { IProject } from "./project.interface";
import { IUser } from "./user.interface";

export type INewTeam = {
  name: string;
  category: string;
  description: string;
  image: string;
  admin: string;
};

export type ITeam = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: IUser;
  projects: IProject[];
  leaveRequests: IUser[];
  activeMembers: IUser[];
  pendingMembers: IUser[];
  createdAt: Date;
  updatedAt: Date;
};
