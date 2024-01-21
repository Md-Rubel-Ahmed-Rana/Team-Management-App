import { Types } from "mongoose";

export type ITask = {
  name: string;
  projectId: Types.ObjectId | string;
  assignedMember: Types.ObjectId | string;
  assignedBy: Types.ObjectId | string;
  status: "todo" | "ongoing" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
};
