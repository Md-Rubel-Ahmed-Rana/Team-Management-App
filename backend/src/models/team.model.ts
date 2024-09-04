import { ITeam } from "@/interfaces/team.interface";
import { Schema, model } from "mongoose";

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
        default: [],
      },
    ],
    leaveRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    activeMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    pendingMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

const Team = model("Team", teamSchema);

export default Team;
