import { Types } from "mongoose";

export type ITask = {
  name: string;
  deadline?: string;
  projectId: Types.ObjectId | string;
  assignedMember: Types.ObjectId | string;
  assignedBy: Types.ObjectId | string;
  status: "Todo" | "Ongoing" | "Completed";
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
};
