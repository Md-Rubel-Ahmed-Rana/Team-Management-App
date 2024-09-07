import { ITask } from "@/interfaces/task.interface";
import { Schema, model } from "mongoose";
import { Project } from "./project.model";
import { CacheServiceInstance } from "@/services/cache.service";
import { ProjectService } from "@/services/project.service";

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
  const updatedProject = await Project.findByIdAndUpdate(
    doc.project,
    {
      $inc: { tasks: 1 },
    },
    { new: true }
  );
  const dtoData = ProjectService.projectSanitizer(updatedProject);
  await CacheServiceInstance.project.updateProjectInCache(dtoData);
});

export const Task = model("Task", taskSchema);
