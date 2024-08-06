import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Server } from "socket.io";
import http from "http";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./configurations/envConfig";
import { RootRoutes } from "./routes/root.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import initializeDTOMapper from "./configurations/dtoMapper";
import jwt from "jsonwebtoken";
import "./configurations/passport";

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
app.use(
  session({
    secret: config.google.clientSecret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

const jwtSecret = "this is jwt secret";

const generateToken = async (payload: {
  id: string;
  name: string;
  email: string;
}) => {
  const accessToken = await jwt.sign(payload, jwtSecret, { expiresIn: 60 });
  const refreshToken = await jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
  return { accessToken, refreshToken };
};

const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};

app.get("/token", async (req, res) => {
  const payload = {
    id: "fkjhdifhvweiruthwier",
    name: "Rubel",
    email: "rubel@gmail.com",
  };
  const tokens = await generateToken(payload);
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "You got a token",
    data: tokens,
  });
});

app.get("/verify-token", async (req, res) => {
  try {
    const { accessToken }: any = req.body;
    const verified = verifyToken(accessToken);
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Your token verified",
      data: verified,
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const { refreshToken }: any = req.body;
      const verified = verifyToken(refreshToken);
      const { id, name, email }: any = verified;
      const tokens = await generateToken({ id, name, email });
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        success: true,
        message: "Tokens rotated successfully",
        data: tokens,
      });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  }
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

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Connecting to Socket.IO
io.on("connection", async (socket) => {
  console.log("A user connected");

  // messaging room for a team
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
  });

  socket.on("message", (data) => {
    socket.to(data.conversationId).emit("message", data);
  });

  // notification room for each user
  socket.on("notification-room", (userId: string) => {
    console.log("notification room", userId);
    socket.join(userId);
  });

  socket.on("notification", (data) => {
    console.log("New notification", data);
    socket.to(data.recipient.userId).emit("notification", data);
  });

  // tasks room
  socket.on("task-room", (projectId: string) => {
    console.log("task room", projectId);
    socket.join(projectId);
  });

  socket.on("task", (data) => {
    console.log("New task", data);
    socket.to(data.project).emit("task", data);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected");
  });
});

export default server;
