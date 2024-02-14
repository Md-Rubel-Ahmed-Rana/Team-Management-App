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

class Service {
  async createTask(data: ITask): Promise<CreateTaskDTO> {
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

    const mappedData = mapper.map(
      result,
      TaskEntity as ModelIdentifier,
      CreateTaskDTO
    );

    return mappedData;
  }

  async getTasksByProjectId(projectId: string): Promise<GetTaskDTO[]> {
    const result = await Task.find({ project: projectId }).populate([
      {
        path: "assignedTo",
        model: "User",
      },
      {
        path: "assignedBy",
        model: "User",
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
