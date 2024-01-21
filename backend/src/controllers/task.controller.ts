// Task Controller
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TaskService.createTask(req.body);

    res.json({
      statusCode: 201,
      success: true,
      message: "Successfully created task",
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
  } catch (error) {
    next(error);
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

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.taskId;
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
};
