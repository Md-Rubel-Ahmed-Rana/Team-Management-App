import express from "express";
import { Server } from "socket.io";
import http from "http";
import { RootRoutes } from "./routes/root.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import initializeDTOMapper from "./configurations/dtoMapper";
import "./configurations/passport";
import { initiateSocketIo } from "./configurations/socket.io";
import { initiatePassportSession } from "./configurations/passport.session";
import handle404NotFoundError from "./errors/notFoundError";
import appMiddlewares from "./middlewares/appMiddlewares";
import { corsConfig } from "./configurations/cors";
import healthCheck from "./utils/healthCheck";
import {
  upload,
  uploadMultipleFiles,
  uploadSingleFile,
} from "./middlewares/cloudinary";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsConfig,
});

// app middlewares
appMiddlewares(app);

// initialize passport session
initiatePassportSession(app);

// Mappers initiate
initializeDTOMapper();

app.post(
  "/new-post",
  upload.single("file"),
  uploadSingleFile("profile"),
  (req, res) => {
    const data = { ...req.body, url: req.link || "" };
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: data,
    });
  }
);

app.post(
  "/multiple",
  upload.array("files"),
  uploadMultipleFiles("projects"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: req.links || [],
    });
  }
);

// app health check
healthCheck(app);

// api endpoints
app.use(RootRoutes);

// global error handler
app.use(globalErrorHandler.globalErrorHandler);

// handle 404 not found error
handle404NotFoundError(app);

// Connecting to Socket.IO
initiateSocketIo(io);

export default server;
