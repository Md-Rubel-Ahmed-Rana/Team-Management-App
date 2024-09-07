import { IUser, userInitData } from "./user.interface";

export type INewProject = {
  team: string;
  user: string;
  name: string;
  category: string;
};

export type IProject = {
  id: string;
  team: string;
  user: string;
  name: string;
  category: string;
  members: IUser[];
  leaveRequests: IUser[];
  tasks: number;
  createdAt: Date;
  updatedAt: Date;
};

export const projectInit: IProject = {
  id: "",
  name: "",
  category: "",
  team: "",
  user: "",
  members: [],
  leaveRequests: [],
  tasks: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
