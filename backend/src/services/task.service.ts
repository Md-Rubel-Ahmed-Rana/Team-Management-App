import { Task } from "../models/task.model";

const createTask = (data: any) => {
  const result = Task.create(data);
  return result;
};

const getTasksByProjectId = (projectId: string) => {
  return Task.find({ projectId })
    .populate([
      {
        path: "assignedMember",
        model: "User",
      },
      {
        path: "assignedBy",
        model: "User",
      },
    ])
    .exec();
};

const updateTaskStatus = (taskId: string, status: string) => {
  return Task.findByIdAndUpdate(
    taskId,
    { $set: { status } },
    { new: true }
  ).exec();
};

const deleteTask = (taskId: string) => {
  return Task.findByIdAndDelete(taskId).exec();
};

export const TaskService = {
  createTask,
  getTasksByProjectId,
  updateTaskStatus,
  deleteTask,
};
