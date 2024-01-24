import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { RootRoutes } from "./routes/root.route";
import httpStatus from "http-status";

const app = express();
app.use(cors());
app.use(express.json());

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

app.use(globalErrorHandler);

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

export default app;
