import { ITeamDetailsMember } from "./team.interface";
import { IUser, userInitData } from "./user.interface";

export type INewProject = {
  team: string;
  user: string;
  name: string;
  category: string;
};

export type IProject = {
  id: string;
  team: any;
  user: IUser;
  name: string;
  category: string;
  members?: number;
  tasks?: number;
  createdAt: string;
  updatedAt: string;
};
export type IProjectForTeamDetails = {
  category: string;
  createdAt: string;
  id: string;
  members: ITeamDetailsMember[];
  name: string;
  team: string;
  updatedAt: string;
  admin: string;
};

export const projectInit: IProject = {
  id: "",
  name: "",
  category: "",
  createdAt: "",
  team: "",
  updatedAt: "",
  user: userInitData,
  members: 0,
  tasks: 0,
};
