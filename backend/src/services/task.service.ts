import { ITask } from "@/interfaces/task.interface";
import { Task } from "@/models/task.model";
import { NotificationService } from "./notification.service";
import { mapper } from "../mapper";
import { TaskEntity } from "@/entities/task.entity";
import { ModelIdentifier } from "@automapper/core";
import { GetTaskDTO } from "@/dto/task/get";
import { CreateTaskDTO } from "@/dto/task/create";
import { UpdateTaskDTO } from "@/dto/task/update";
import { DeleteTaskDTO } from "@/dto/task/delete";
import { INotification } from "@/interfaces/notification.interface";

type ICreateTask = {
  notification: INotification | undefined;
  data: GetTaskDTO | undefined;
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

      const data = mapper.map(
        result,
        TaskEntity as ModelIdentifier,
        GetTaskDTO
      );

      return { notification, data };
    }
  }

  async getTasksByProjectId(projectId: string): Promise<GetTaskDTO[]> {
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

    const mappedData = mapper.mapArray(
      result,
      TaskEntity as ModelIdentifier,
      GetTaskDTO
    );

    return mappedData;
  }

  async updateTaskStatus(
    taskId: string,
    status: string
  ): Promise<UpdateTaskDTO> {
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true }
    );

    const mappedData = mapper.map(
      result,
      TaskEntity as ModelIdentifier,
      UpdateTaskDTO
    );

    return mappedData;
  }

  async updateTask(taskId: string, name: string): Promise<UpdateTaskDTO> {
    const result = await Task.findByIdAndUpdate(
      taskId,
      { $set: { name } },
      { new: true }
    );

    const mappedData = mapper.map(
      result,
      TaskEntity as ModelIdentifier,
      UpdateTaskDTO
    );

    return mappedData;
  }

  async deleteTask(taskId: string): Promise<DeleteTaskDTO> {
    const result = await Task.findByIdAndDelete(taskId).exec();
    const mappedData = mapper.map(
      result,
      TaskEntity as ModelIdentifier,
      DeleteTaskDTO
    );

    return mappedData;
  }
}
export const TaskService = new Service();
