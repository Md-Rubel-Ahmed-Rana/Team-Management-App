import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import { RootRoutes } from "./routes/root.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import "./configurations/passport";
import { initiateSocketIo } from "./configurations/socket.io";
import { initiatePassportSession } from "./configurations/passport.session";
import handle404NotFoundError from "./errors/notFoundError";
import appMiddlewares from "./middlewares/appMiddlewares";
import { corsConfig } from "./configurations/cors";
import healthCheck from "./utils/healthCheck";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsConfig,
});

// app middlewares
appMiddlewares(app);

// initialize passport session
initiatePassportSession(app);

// app health check default/root route
healthCheck(app);

// api endpoints
app.use(RootRoutes);

// global error handler
app.use(globalErrorHandler.globalErrorHandler);

// handle 404 not found error
handle404NotFoundError(app);

// Initialize Socket.IO
initiateSocketIo(io);

export default server;
