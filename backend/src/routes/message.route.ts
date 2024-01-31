import { Router } from "express";
import { MessageController } from "../controllers/message.controller";
import verifyJwt from "../middlewares/auth";
const router = Router();

router.delete("/delete/:id", verifyJwt, MessageController.deleteMessage);

router.get(
  "/by-type/:type/:conversationId",
  verifyJwt,
  MessageController.getMessagesByType
);

router.get("/all", verifyJwt, MessageController.getAllMessages);

router.get("/by-id/:id", verifyJwt, MessageController.getMessageById);

router.post("/send", verifyJwt, MessageController.createMessage);

router.patch("/update/:id", verifyJwt, MessageController.updateMessage);

export const MessageRoutes = router;
