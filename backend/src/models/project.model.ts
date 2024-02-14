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
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Project = model("Project", projectSchema);
