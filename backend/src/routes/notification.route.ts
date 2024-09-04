import { NotificationController } from "@/controllers/notification.controller";
import { Router } from "express";

const router = Router();

router.get(
  "/unread/count/:userId",
  NotificationController.getUnreadNotificationCount
);

router.post("/send", NotificationController.send);

router.get(
  "/my-notifications/:receiverId",
  NotificationController.getNotificationsByReceiverId
);

router.patch("/status/read/:id", NotificationController.updateStatusToRead);

router.patch("/mark-all-as-read/:userId", NotificationController.markAllAsRead);

router.delete(
  "/delete/single/:id",
  NotificationController.deleteSingleNotification
);

router.post("/delete/many", NotificationController.deleteManyNotifications);

export const NotificationRoutes = router;
