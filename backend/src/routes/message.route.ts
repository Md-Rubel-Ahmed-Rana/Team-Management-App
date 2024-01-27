import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
const router = Router();

router.delete("/delete/:id", MessageController.deleteMessage);

router.get(
  "/by-type/:type/:conversationId",
  MessageController.getMessagesByType
);

router.get("/all", MessageController.getAllMessages);

router.get("/by-id/:id", MessageController.getMessageById);

router.post("/send", MessageController.createMessage);

router.patch("/update-text/:id", MessageController.updateMessage);

export const MessageRoutes = router;
