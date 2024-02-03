import { ITask } from "../interfaces/task.interface";
import { Task } from "../models/task.model";
import { NotificationService } from "./notification.service";

class Service {
  async createTask(data: ITask) {
    const result = await Task.create(data);
    // send notification to add  new  task to project
    if (data?.assignedTo && data?.assignedBy) {
      await NotificationService.sendNotification(
        data.assignedBy,
        data.assignedTo,
        "task_assignment",
        "Assigned to task",
        `You've been assigned to a task (${data?.name})`,
        "projects"
      );
    }

    return result;
  }

  async getTasks() {
    const result = await Task.find({});
    return result;
  }

  async getTasksByProjectId(projectId: string) {
    const result = await Task.find({ project: projectId })
      .populate([
        {
          path: "assignedTo",
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
    );
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
