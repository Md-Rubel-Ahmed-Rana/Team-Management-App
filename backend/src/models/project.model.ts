import { IProject } from "@/interfaces/project.interface";
import { Schema, model } from "mongoose";
import Team from "./team.model";

const projectSchema = new Schema<IProject>(
  {
    team: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    leaveRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    members: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    tasks: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

// Middleware to increment project in the Team schema
projectSchema.post("save", async function (doc) {
  await Team.findByIdAndUpdate(doc.team, {
    $push: { projects: doc._id },
  });
});

export const Project = model("Project", projectSchema);
