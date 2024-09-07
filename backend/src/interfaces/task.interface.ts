import { Types } from "mongoose";

export type ITask = {
  _id?: Types.ObjectId;
  name: string;
  deadline?: string;
  project: Types.ObjectId;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
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
