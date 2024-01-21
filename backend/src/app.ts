import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { UserRouter } from "./routes/user.route";
import { TeamRouter } from "./routes/team.route";
import { InvitationRoutes } from "./routes/invitation.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { NotificationRoutes } from "./routes/notification.route";
import { PaymentRoutes } from "./routes/payment.route";
import { PlanRoutes } from "./routes/plan.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", UserRouter);
app.use("/team", TeamRouter);
app.use("/invitation", InvitationRoutes);
app.use("/payment", PaymentRoutes);
app.use("/plan", PlanRoutes);
app.use("/notification", NotificationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Little Programmer task server is running!",
    data: null,
  });
});

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
