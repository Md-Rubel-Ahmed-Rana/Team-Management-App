import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IProject } from "./project.interface";

export type ITask = {
  _id?: Types.ObjectId;
  name: string;
  deadline?: string;
  project: Types.ObjectId | IProject["_id"];
  assignedTo: Types.ObjectId | IUser["_id"];
  assignedBy: Types.ObjectId | IUser["_id"];
  status: "Todo" | "Ongoing" | "Completed";
  createdAt?: Date;
  updatedAt?: Date;
};

export type INewTaskForSocket = {
  id: string;
  name: string;
  deadline: string;
  project: {
    id: string;
    name: string;
    category: string;
  };
  assignedTo: {
    id: string;
    name: string;
    profile_picture: string;
  };
  assignedBy: {
    id: string;
    name: string;
    profile_picture: string;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
