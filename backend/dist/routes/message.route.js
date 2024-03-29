"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const message_controller_1 = require("@/controllers/message.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.delete("/delete/:id", auth_1.default, message_controller_1.MessageController.deleteMessage);
router.get("/by-type/:type/:conversationId", message_controller_1.MessageController.getMessagesByType);
router.get("/by-id/:id", auth_1.default, message_controller_1.MessageController.getMessageById);
router.post("/send", auth_1.default, message_controller_1.MessageController.createMessage);
router.patch("/update/:id", auth_1.default, message_controller_1.MessageController.updateMessage);
exports.MessageRoutes = router;
