import { IMessagePayloadForSocket } from "@/interfaces/message.interface";
import { INewTaskForSocket } from "@/interfaces/task.interface";
import { NotificationService } from "@/services/notification.service";
import { Server, Socket } from "socket.io";

export const initiateSocketIo = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log("A user connected");
    // messaging room for a team
    socket.on("join-team-room", (roomId: string) => {
      console.log(`New team member joined to:'${roomId}' room`);
      socket.join(roomId);
    });

    // broadcast team message
    socket.on("team-message", (message: IMessagePayloadForSocket) => {
      console.log("New team message", message);
      socket.broadcast
        .to(message?.conversationId)
        .emit("team-message", message);
    });

    // notification room for each user
    socket.on("notification-room", (userId: string) => {
      console.log(`New user connected to notification room: ${userId}`);
      socket.join(userId);
    });

    socket.on("notification", async (receiverId: string) => {
      console.log("New notification receiverId", receiverId);
      const newNotification =
        await NotificationService.getUnreadNotificationCount(receiverId);
      console.log("New notification count:", newNotification);
      socket.broadcast.to(receiverId).emit("notification", newNotification);
    });

    // tasks room
    socket.on("join-task-room", (projectId: string) => {
      console.log(`New user connected to task room: ${projectId}`);
      socket.join(projectId);
    });

    socket.on("task", (task: INewTaskForSocket) => {
      console.log("New task", task);
      socket.broadcast.to(task?.project?.id).emit("task", task);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected");
    });
  });
};
