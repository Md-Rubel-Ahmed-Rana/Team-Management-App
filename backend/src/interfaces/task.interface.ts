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
