import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();

router.post("/send", NotificationController.sendNotification);

router.get("/", NotificationController.getAllNotification);

router.get(
  "/my-notification/:receiverId",
  NotificationController.myNotification
);

export const NotificationRoutes = router;
