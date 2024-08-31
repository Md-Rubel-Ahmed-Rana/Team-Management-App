"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateSocketIo = void 0;
const notification_service_1 = require("@/services/notification.service");
const initiateSocketIo = (io) => {
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("A user connected");
        // messaging room for a team
        socket.on("join-team-room", (roomId) => {
            console.log(`New team member joined to:'${roomId}' room`);
            socket.join(roomId);
        });
        // broadcast team message
        socket.on("team-message", (message) => {
            console.log("New team message", message);
            socket.broadcast
                .to(message === null || message === void 0 ? void 0 : message.conversationId)
                .emit("team-message", message);
        });
        // notification room for each user
        socket.on("notification-room", (userId) => {
            console.log(`New user connected to notification room: ${userId}`);
            socket.join(userId);
        });
        socket.on("notification", (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("New notification receiverId", receiverId);
            const newNotification = yield notification_service_1.NotificationService.getUnreadNotificationCount(receiverId);
            console.log("New notification count:", newNotification);
            socket.broadcast.to(receiverId).emit("notification", newNotification);
        }));
        // tasks room
        socket.on("join-task-room", (projectId) => {
            console.log(`New user connected to task room: ${projectId}`);
            socket.join(projectId);
        });
        socket.on("task", (task) => {
            var _a;
            console.log("New task", task);
            socket.broadcast.to((_a = task === null || task === void 0 ? void 0 : task.project) === null || _a === void 0 ? void 0 : _a.id).emit("task", task);
        });
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("User disconnected");
        }));
    }));
};
exports.initiateSocketIo = initiateSocketIo;
