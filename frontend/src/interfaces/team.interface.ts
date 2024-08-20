import { IProjectForTeamDetails } from "./project.interface";
import { IUser } from "./user.interface";

export type ITeam = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: IUser;
  activeMembers: Array<IUser | string>;
  pendingMembers?: Array<IUser | string>;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ITeamCard = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: string;
  activeMembers: number;
  pendingMembers: number;
  projects: number;
};

export type INewTeam = {
  name: string;
  category: string;
  description: string;
  image: string;
  admin: string;
};

export type ITeamDetailsMember = {
  email: string;
  id: string;
  name: string;
  profile_picture: string;
};

export type ITeamDetails = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  activeMembers: ITeamDetailsMember[];
  admin: ITeamDetailsMember;
  pendingMembers: ITeamDetailsMember[];
  projects: IProjectForTeamDetails[];
};
