import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

const sendNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await NotificationService.sendNotification(req.body);
  res.json({
    statusCode: 200,
    success: true,
    message: "Notification sent successfully",
    data: result,
  });
};

const getAllNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await NotificationService.getAllNotification();
  res.json({
    statusCode: 200,
    success: true,
    message: "Notifications fetched successfully",
    data: result,
  });
};

const myNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await NotificationService.myNotification(
    req.params.receiverId
  );
  res.json({
    statusCode: 200,
    success: true,
    message: "Notifications fetched successfully",
    data: result,
  });
};

export const NotificationController = {
  sendNotification,
  getAllNotification,
  myNotification,
};
