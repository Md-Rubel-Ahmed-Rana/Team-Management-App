import { MessageController } from "@/controllers/message.controller";
import verifyJwt from "@/middlewares/auth";
import { Router } from "express";
const router = Router();

router.delete("/delete/:id", verifyJwt, MessageController.deleteMessage);

router.get(
  "/by-type/:type/:conversationId",
  MessageController.getMessagesByType
);

router.get("/by-id/:id", verifyJwt, MessageController.getMessageById);

router.post("/send", verifyJwt, MessageController.createMessage);

router.patch("/update/:id", verifyJwt, MessageController.updateMessage);

export const MessageRoutes = router;
