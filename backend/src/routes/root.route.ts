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
import { GooglOAuthRoutes } from "./googleOAuth.route";

const router = Router();

router.use("/user", UserRoutes);

router.use("/team", TeamRoutes);

router.use("/invitation", InvitationRoutes);

router.use("/payment", PaymentRoutes);

router.use("/plan", PlanRoutes);

router.use("/project", ProjectRoutes);

router.use("/task", TaskRoutes);

router.use("/leave-team", TeamLeaveRequestRoutes);

router.use("/leave-project", ProjectLeaveRequestRoutes);

router.use("/google", GooglOAuthRoutes);

export const RootRoutes = router;
