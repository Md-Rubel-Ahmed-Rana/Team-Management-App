import { Router } from "express";
import { UserRoutes } from "./user.route";
import { TeamRoutes } from "./team.route";
import { InvitationRoutes } from "./invitation.route";
import { PaymentRoutes } from "./payment.route";
import { PlanRoutes } from "./plan.route";
import { ProjectRoutes } from "./project.route";
import { TaskRoutes } from "./task.route";
import { TeamLeaveRequestRoutes } from "./teamLeaveRequest.route";
import { ProjectLeaveRequestRoutes } from "./projectLeaveRequest.route";
import { MailRoutes } from "./mail.route";
import { MessageRoutes } from "./message.route";
import { NotificationRoutes } from "./notification.route";
import { AuthRoutes } from "./auth.routes";
import { JwtInstance } from "lib/jwt";
import { FileUploadRoutes } from "./file.route";

const router = Router();

router.use("/user", UserRoutes);

router.use("/auth", AuthRoutes);

router.use("/team", JwtInstance.verifyToken, TeamRoutes);

router.use("/invitation", JwtInstance.verifyToken, InvitationRoutes);

router.use("/payment", JwtInstance.verifyToken, PaymentRoutes);

router.use("/plan", PlanRoutes);

router.use("/project", JwtInstance.verifyToken, ProjectRoutes);

router.use("/task", JwtInstance.verifyToken, TaskRoutes);

router.use("/leave-team", JwtInstance.verifyToken, TeamLeaveRequestRoutes);

router.use(
  "/leave-project",
  JwtInstance.verifyToken,
  ProjectLeaveRequestRoutes
);

router.use("/mail", MailRoutes);

router.use("/message", JwtInstance.verifyToken, MessageRoutes);

router.use("/cloudinary", FileUploadRoutes);

router.use("/notification", JwtInstance.verifyToken, NotificationRoutes);

export const RootRoutes = router;
