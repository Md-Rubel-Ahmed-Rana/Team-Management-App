import { Types } from "mongoose";

type ProjectMember = {
  role?: string;
  member: Types.ObjectId | string;
};

export type IProject = {
  teamId: string;
  userId: string;
  name: string;
  category: string;
  members: ProjectMember[];
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
};
