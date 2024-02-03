import { IProject } from "@/interfaces/project.interface";
import { Schema, model } from "mongoose";

const projectSchema = new Schema<IProject>(
  {
    team: {
      type: String,
      required: true,
      ref: "Team",
    },
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    members: [
      {
        role: {
          type: String,
        },
        member: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = model("Project", projectSchema);
