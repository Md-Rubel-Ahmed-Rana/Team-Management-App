import { NotificationService } from "@/services/notification.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  send = this.catchAsync(async (req: Request, res: Response) => {
    const result = await NotificationService.createNotification(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Notification sent successfully",
      data: result,
    });
  });
  getNotificationsByReceiverId = this.catchAsync(
    async (req: Request, res: Response) => {
      const receiverId = req.params.receiverId;
      const limit = req.query?.limit ? Number(req.query?.limit) : 10;
      const result = await NotificationService.getNotificationsByReceiverId(
        receiverId,
        limit
      );
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Notifications fetched successfully",
        data: result,
      });
    }
  );
  getUnreadNotificationCount = this.catchAsync(
    async (req: Request, res: Response) => {
      const userId = req.params.userId;
      const result = await NotificationService.getUnreadNotificationCount(
        userId
      );
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Total unread notifications",
        data: result,
      });
    }
  );
  markAllAsRead = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await NotificationService.markAllAsRead(userId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All marked as read",
      data: { readCount: result },
    });
  });
  updateStatusToRead = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await NotificationService.updateStatusToRead(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Notification read successfully",
      data: result,
    });
  });
}

export const NotificationController = new Controller();
