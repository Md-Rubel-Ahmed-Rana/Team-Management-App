import { NotificationController } from "@/controllers/notification.controller";
import { RedisCacheService } from "@/middlewares/redisCache";
import { Router } from "express";

const router = Router();

router.get("/single/:userId", RedisCacheService.findNotification());

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

router.patch("/update/:userId", RedisCacheService.updateNotification());

export const NotificationRoutes = router;
