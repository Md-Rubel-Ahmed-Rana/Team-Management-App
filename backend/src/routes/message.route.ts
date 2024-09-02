import { MessageController } from "@/controllers/message.controller";
import { upload, uploadMessageImageAndFiles } from "@/middlewares/cloudinary";
import { Router } from "express";
const router = Router();

router.delete("/delete/:id", MessageController.deleteMessage);

router.get(
  "/by-type/:type/:conversationId",
  MessageController.getMessagesByType
);

router.get(
  "/one-to-one-messages/:conversationId",
  MessageController.getOneToOneMessagesWithType
);

router.get("/by-id/:id", MessageController.getMessage);

router.get("/single/:id", MessageController.getMessageById);

router.post(
  "/send",
  upload.fields([{ name: "files" }, { name: "images" }]),
  uploadMessageImageAndFiles("messages"),
  MessageController.createMessage
);

router.patch("/update/:id", MessageController.updateMessage);

export const MessageRoutes = router;
