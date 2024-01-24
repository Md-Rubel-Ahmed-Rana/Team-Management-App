import { Router } from "express";
import { UserRoutes } from "./user.route";
import { TeamRoutes } from "./team.route";
import { InvitationRoutes } from "./invitation.route";
import { PaymentRoutes } from "./payment.route";
import { PlanRoutes } from "./plan.route";
import { ProjectRoutes } from "./project.route";
import { TaskRoutes } from "./task.route";

const router = Router();

router.use("/user", UserRoutes);
router.use("/team", TeamRoutes);
router.use("/invitation", InvitationRoutes);
router.use("/payment", PaymentRoutes);
router.use("/plan", PlanRoutes);
router.use("/project", ProjectRoutes);
router.use("/task", TaskRoutes);

export const RootRoutes = router;
