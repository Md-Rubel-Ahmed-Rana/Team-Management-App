import { Types } from "mongoose";

export type IProjectLeaveRequest = {
  admin: Types.ObjectId;
  project: Types.ObjectId;
  member: Types.ObjectId;
  status: "pending" | "ignored" | "accepted";
  createdAt: Date;
  updatedAt: Date;
};
