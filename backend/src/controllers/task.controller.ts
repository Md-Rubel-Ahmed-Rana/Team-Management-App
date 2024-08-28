import { TaskService } from "@/services/task.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  createTask = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.createTask(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Task created  successfully",
      data: result,
    });
  });

  getTasksByProjectId = this.catchAsync(async (req: Request, res: Response) => {
    const projectId = req.params.projectId;
    const tasks = await TaskService.getTasksByProjectId(projectId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tasks found",
      data: tasks,
    });
  });

  updateTaskStatus = this.catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const status = req.body.status;
    const result = await TaskService.updateTaskStatus(taskId, status, req?.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task status updated successfully",
      data: result,
    });
  });

  updateTask = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await TaskService.updateTask(id, name, req?.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task status updated successfully",
      data: result,
    });
  });

  deleteTask = this.catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const result = await TaskService.deleteTask(taskId, req?.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Task deleted successfully",
      data: result,
    });
  });
}

export const TaskController = new Controller();
