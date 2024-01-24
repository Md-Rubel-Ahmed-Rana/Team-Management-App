import { Router } from "express";
import { InvitationController } from "../controllers/invitation.controller";

const router = Router();

router.post("/send/:teamId/:memberId", InvitationController.sendInvitation);

router.get("/pending/:memberId", InvitationController.pendingInvitation);

router.post("/reject/:teamId/:memberId", InvitationController.rejectInvitation);

router.post("/accept/:teamId/:memberId", InvitationController.acceptInvitation);

export const InvitationRoutes = router;
