import { ITask } from "@/interfaces/task.interface";
import { Task } from "@/models/task.model";
import { NotificationService } from "./notification.service";
import { INotification } from "@/interfaces/notification.interface";
import mongoose from "mongoose";
import { config } from "@/configurations/envConfig";
import { NotificationEnums } from "enums";
import ApiError from "@/shared/apiError";

class Service {
  async createTask(taskData: ITask): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const newTask: any = await Task.create([taskData], { session });
      const populatedResult = await newTask[0].populate([
        {
          path: "project",
          model: "Project",
          select: { name: 1, category: 1 },
        },
      ]);

      if (taskData?.assignedTo && taskData?.assignedBy) {
        const notifyObject: INotification = {
          title: "You have been assigned a task",
          type: NotificationEnums.TASK_ASSIGNED,
          content: `You have been assigned the task "${taskData?.name}" in the project "${populatedResult?.project?.name}". Please review the task and start working on it as soon as possible.`,
          receiver: taskData?.assignedTo,
          sender: taskData?.assignedBy,
          link: `${config.app.frontendDomain}/tasks/${taskData?.project}?project_name=${populatedResult?.project?.name}&project_id=${taskData?.project}&project_category=${populatedResult?.project?.category}`,
        };
        await NotificationService.createNotification(notifyObject, session);
      }
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
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

  async updateTaskStatus(
    taskId: string,
    status: string,
    updaterId: string
  ): Promise<any> {
    const userProjection = {
      name: 1,
      profile_picture: 1,
      email: 1,
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result: any = await Task.findByIdAndUpdate(
        taskId,
        { $set: { status } },
        { new: true, session } // Ensure session is used here
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
        {
          path: "project",
          model: "Project",
          select: { name: 1, category: 1 },
        },
      ]);

      const notifyObject: INotification = {
        title: "Task status changed",
        type: NotificationEnums.TASK_UPDATED,
        content: "",
        receiver: "",
        sender: "",
        link: `${config.app.frontendDomain}/tasks/${result?.project}?project_name=${result?.project?.name}&project_id=${result?.project?.id}&project_category=${result?.project?.category}`,
      };

      switch (result?.status?.toLowerCase()) {
        case "todo":
          notifyObject.content = `The task "${result?.name}" in project "${result?.project?.name}" has been assigned to you. Please review it and start working on it as soon as possible.`;
          break;
        case "ongoing":
          notifyObject.content = `The task "${result?.name}" in project "${result?.project?.name}" is now in progress. Keep up the good work!`;
          break;
        case "completed":
          notifyObject.content = `The task "${result?.name}" in project "${result?.project?.name}" has been marked as completed. Great job!`;
          break;
        default:
          console.warn(`Unknown task status: ${result?.status}`);
          break;
      }

      if (updaterId === result?.assignedTo?.id) {
        notifyObject.sender = result?.assignedTo?.id;
        notifyObject.receiver = result?.assignedBy?.id;
      } else {
        notifyObject.sender = result?.assignedBy?.id;
        notifyObject.receiver = result?.assignedTo?.id;
      }

      await NotificationService.createNotification(notifyObject, session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(500, "Something went wrong to update task status");
    } finally {
      session.endSession();
    }
  }

  async updateTask(
    taskId: string,
    name: string,
    updaterId: string
  ): Promise<any> {
    const userProjection = {
      name: 1,
      profile_picture: 1,
      email: 1,
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result: any = await Task.findByIdAndUpdate(
        taskId,
        { $set: { name } },
        { new: true, session }
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

      const notifyObject: INotification = {
        title: "Task name changed",
        type: NotificationEnums.TASK_UPDATED,
        content: `The task name has been changed to "${result?.name}". Please take note of the updated task.`,
        receiver: "",
        sender: updaterId,
        link: `${config.app.frontendDomain}/tasks/${result?.project}?project_name=${result?.project?.name}&project_id=${result?.project?.id}`,
      };

      if (updaterId === result?.assignedTo?.id) {
        notifyObject.receiver = result?.assignedBy?.id;
      } else {
        notifyObject.receiver = result?.assignedTo?.id;
      }
      await NotificationService.createNotification(notifyObject, session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(500, "Something went wrong updating the task");
    } finally {
      session.endSession();
    }
  }

  async deleteTask(taskId: string, updaterId: string): Promise<any> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const isTaskExist: any = await Task.findById(taskId).populate([
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
      await Task.findByIdAndDelete(taskId, { session });
      if (isTaskExist) {
        const notifyObject: INotification = {
          title: "Task deleted",
          type: NotificationEnums.TASK_DELETED,
          content: `The task "${isTaskExist?.name}" has been deleted from the project "${isTaskExist?.project?.name}".`,
          receiver: "",
          sender: updaterId,
          link: `${config.app.frontendDomain}/projects/${isTaskExist?.project?._id}`,
        };

        if (updaterId === isTaskExist?.assignedTo?.id) {
          notifyObject.receiver = isTaskExist?.assignedBy?.id;
        } else {
          notifyObject.receiver = isTaskExist?.assignedTo?.id;
        }
        console.log({ notifyObject });

        await NotificationService.createNotification(notifyObject, session);
      }

      await session.commitTransaction();
      return isTaskExist;
    } catch (error) {
      await session.abortTransaction();
      throw new ApiError(500, "Something went wrong deleting the task");
    } finally {
      session.endSession();
    }
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
