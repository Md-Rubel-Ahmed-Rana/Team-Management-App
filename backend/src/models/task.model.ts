import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/task.interface";

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
  }
);

export const Task = model("Task", taskSchema);
