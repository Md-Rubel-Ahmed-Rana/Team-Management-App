import { MessageController } from "@/controllers/message.controller";
import { Router } from "express";
const router = Router();

router.delete("/delete/:id", MessageController.deleteMessage);

router.get(
  "/by-type/:type/:conversationId",
  MessageController.getMessagesByType
);

router.get("/by-id/:id", MessageController.getMessageById);

router.post("/send", MessageController.createMessage);

router.patch("/update/:id", MessageController.updateMessage);

export const MessageRoutes = router;
