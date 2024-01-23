import { Task } from "../models/task.model";

class Service {
  async createTask(data: any) {
    const result = await Task.create(data);
    return result;
  }

  async getTasksByProjectId(projectId: string) {
    const result = await Task.find({ projectId })
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

    return result;
  }

  async updateTaskStatus(taskId: string, status: string) {
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true }
    ).exec();

    return result;
  }

  async updateTask(taskId: string, name: string) {
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { name } },
      { new: true }
    ).exec();

    return result;
  }

  async deleteTask(taskId: string) {
    const result = await Task.findByIdAndDelete(taskId).exec();
    return result;
  }
}
export const TaskService = new Service();
