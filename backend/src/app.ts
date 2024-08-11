import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Server } from "socket.io";
import http from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { RootRoutes } from "./routes/root.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import initializeDTOMapper from "./configurations/dtoMapper";
import morgan from "morgan";
import "./configurations/passport";
import { initiateSocketIo } from "./configurations/socket.io";
import { initiatePassportSession } from "./configurations/passport.session";
import { apiLimiter } from "./configurations/apiRateLimiter";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://team-management-app-client.vercel.app",
      "https://team-manager-eight.vercel.app",
    ],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://team-manager-eight.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(apiLimiter);

// initialize passport session
initiatePassportSession(app);

// * Mappers initiate
initializeDTOMapper();

// base route to check application health
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "Team Manager server is running",
    data: null,
  });
});

// routes
app.use(RootRoutes);

app.use(globalErrorHandler.globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

// Connecting to Socket.IO
initiateSocketIo(io);

export default server;
