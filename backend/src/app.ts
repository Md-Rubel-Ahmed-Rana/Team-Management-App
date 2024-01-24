import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { RootRoutes } from "./routes/root.route";

const app = express();
app.use(cors());
app.use(express.json());

// base route to check application health
app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Little Programmer task server is running!",
    data: null,
  });
});

// routes
app.use(RootRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
    statusCode: 404,
  });
  next();
});

export default app;
