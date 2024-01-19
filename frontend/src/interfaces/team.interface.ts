import { IUser } from "./user.interface";

export type ITeam = {
  _id?: string;
  name: string;
  category: string;
  description: string;
  image: string;
  admin: string | IUser;
  activeMembers?: Array<IUser | string>;
  pendingMembers?: Array<IUser | string>;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
