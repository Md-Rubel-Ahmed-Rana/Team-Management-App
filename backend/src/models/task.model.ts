import { ITask } from "@/interfaces/task.interface";
import { Schema, model } from "mongoose";
import { Project } from "./project.model";

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Todo", "Ongoing", "Completed"],
      default: "Todo",
    },
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
taskSchema.post("save", async function (doc) {
  await Project.findByIdAndUpdate(doc.project, {
    $inc: { tasks: 1 },
  });
});

export const Task = model("Task", taskSchema);
