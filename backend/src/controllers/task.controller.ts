// Task Controller
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TaskService.createTask(req.body);
    res.json({
      statusCode: 201,
      success: true,
      message: "Task created  successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTasksByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await TaskService.getTasksByProjectId(projectId);

    res.json({
      statusCode: 200,
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.json({
      statusCode: 400,
      success: false,
      error: error?.message,
      message: "Tasks not found",
    });
  }
};

const updateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.taskId;
    const status = req.body.status;
    const updatedTask = await TaskService.updateTaskStatus(taskId, status);

    res.json({
      statusCode: 200,
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTask = await TaskService.updateTask(id, name);

    res.json({
      statusCode: 200,
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
    console.log({ taskId });
    await TaskService.deleteTask(taskId);

    res.json({
      statusCode: 200,
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const TaskController = {
  createTask,
  getTasksByProjectId,
  updateTaskStatus,
  deleteTask,
  updateTask,
};
