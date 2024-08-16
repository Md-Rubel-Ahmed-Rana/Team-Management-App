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

export type INewTeam = {
  name: string;
  category: string;
  description: string;
  image: string;
  admin: string;
};
