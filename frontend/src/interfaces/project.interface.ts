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
