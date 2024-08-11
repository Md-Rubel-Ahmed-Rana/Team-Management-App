import { Server } from "socket.io";

export const initiateSocketIo = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("A user connected");

    // messaging room for a team
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("message", (data: any) => {
      socket.to(data.conversationId).emit("message", data);
    });

    // notification room for each user
    socket.on("notification-room", (userId: string) => {
      console.log("notification room", userId);
      socket.join(userId);
    });

    socket.on("notification", (data: any) => {
      console.log("New notification", data);
      socket.to(data.recipient.userId).emit("notification", data);
    });

    // tasks room
    socket.on("task-room", (projectId: string) => {
      console.log("task room", projectId);
      socket.join(projectId);
    });

    socket.on("task", (data: any) => {
      console.log("New task", data);
      socket.to(data.project).emit("task", data);
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected");
    });
  });
};
