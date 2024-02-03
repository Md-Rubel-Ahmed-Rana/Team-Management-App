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
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activeMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = model("Team", teamSchema);

export default Team;
