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
const initiateSocketIo = (io) => {
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("A user connected");
        // messaging room for a team
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
        });
        socket.on("message", (data) => {
            socket.to(data.conversationId).emit("message", data);
        });
        // notification room for each user
        socket.on("notification-room", (userId) => {
            console.log("notification room", userId);
            socket.join(userId);
        });
        socket.on("notification", (data) => {
            console.log("New notification", data);
            socket.to(data.recipient.userId).emit("notification", data);
        });
        // tasks room
        socket.on("task-room", (projectId) => {
            console.log("task room", projectId);
            socket.join(projectId);
        });
        socket.on("task", (data) => {
            console.log("New task", data);
            socket.to(data.project).emit("task", data);
        });
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("User disconnected");
        }));
    }));
};
exports.initiateSocketIo = initiateSocketIo;
