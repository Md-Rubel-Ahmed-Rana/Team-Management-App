import { Types } from "mongoose";

export type ITeamLeaveRequest = {
  admin: Types.ObjectId;
  team: Types.ObjectId;
  member: Types.ObjectId;
  status: "pending" | "ignored" | "accepted";
  createdAt: Date;
  updatedAt: Date;
};
