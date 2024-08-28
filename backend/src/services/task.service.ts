import { ITask } from "@/interfaces/task.interface";
import { Task } from "@/models/task.model";
import { NotificationService } from "./notification.service";
import { INotification } from "@/interfaces/notification.interface";
import mongoose from "mongoose";

type ICreateTask = {
  notification: INotification | undefined;
  data: any;
};

class Service {
  async createTask(taskData: ITask): Promise<ICreateTask | undefined> {
    const newTask = await Task.create(taskData);
    // send notification to add  new  task to project
    if (taskData?.assignedTo && taskData?.assignedBy) {
      const notification = await NotificationService.sendNotification(
        taskData.assignedBy,
        taskData.assignedTo,
        "task_assignment",
        "Assigned to task",
        `You've been assigned to a task (${taskData?.name})`,
        "projects"
      );

      const result = await Task.findById(newTask?.id).populate([
        {
          path: "assignedTo",
          model: "User",
        },
        {
          path: "assignedBy",
          model: "User",
        },
      ]);

      return { notification, data: result };
    }
  }

  async getTasksByProjectId(projectId: string): Promise<any> {
    const result = await Task.find({ project: projectId }).populate([
      {
        path: "assignedTo",
        model: "User",
        select: { name: 1, profile_picture: 1 },
      },
      {
        path: "assignedBy",
        model: "User",
        select: { name: 1, profile_picture: 1 },
      },
      {
        path: "project",
        model: "Project",
        select: { name: 1, category: 1 },
      },
    ]);

    return result;
  }

  async updateTaskStatus(taskId: string, status: string): Promise<any> {
    const userProjection = {
      name: 1,
      profile_picture: 1,
      email: 1,
    };
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true }
    ).populate([
      {
        path: "assignedTo",
        model: "User",
        select: userProjection,
      },
      {
        path: "assignedBy",
        model: "User",
        select: userProjection,
      },
    ]);

    return result;
  }

  async updateTask(taskId: string, name: string): Promise<any> {
    const userProjection = {
      name: 1,
      profile_picture: 1,
      email: 1,
    };
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { name } },
      { new: true }
    ).populate([
      {
        path: "assignedTo",
        model: "User",
        select: userProjection,
      },
      {
        path: "assignedBy",
        model: "User",
        select: userProjection,
      },
    ]);

    return result;
  }

  async deleteTask(taskId: string): Promise<any> {
    const result = await Task.findByIdAndDelete(taskId).exec();
    return result;
  }
  async deleteTasksByProjectId(
    projectId: string,
    session: mongoose.ClientSession
  ): Promise<any> {
    const result = await Task.deleteMany({ project: projectId }).session(
      session
    );
    return result;
  }
}
export const TaskService = new Service();
