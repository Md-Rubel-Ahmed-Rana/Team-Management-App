import { Router } from "express";
import { UserRoutes } from "./user.route";
import { TeamRoutes } from "./team.route";
import { InvitationRoutes } from "./invitation.route";
import { PaymentRoutes } from "./payment.route";
import { PlanRoutes } from "./plan.route";
import { ProjectRoutes } from "./project.route";
import { TaskRoutes } from "./task.route";
import { MailRoutes } from "./mail.route";
import { MessageRoutes } from "./message.route";
import { NotificationRoutes } from "./notification.route";
import { AuthRoutes } from "./auth.routes";
import { JwtInstance } from "lib/jwt";

const router = Router();

router.use("/user", UserRoutes);

router.use("/auth", AuthRoutes);

router.use("/team", JwtInstance.verifyToken, TeamRoutes);

router.use("/invitation", JwtInstance.verifyToken, InvitationRoutes);

router.use("/payment", PaymentRoutes);

router.use("/plan", PlanRoutes);

router.use("/project", JwtInstance.verifyToken, ProjectRoutes);

router.use("/task", JwtInstance.verifyToken, TaskRoutes);

router.use("/mail", MailRoutes);

router.use("/message", JwtInstance.verifyToken, MessageRoutes);

router.use("/notification", JwtInstance.verifyToken, NotificationRoutes);

export const RootRoutes = router;
