import { InvitationController } from "@/controllers/invitation.controller";
import { Router } from "express";

const router = Router();

router.post("/send/:teamId/:memberId", InvitationController.sendInvitation);

router.get("/pending/:memberId", InvitationController.pendingInvitation);

router.post("/reject/:teamId/:memberId", InvitationController.rejectInvitation);

router.post("/accept/:teamId/:memberId", InvitationController.acceptInvitation);

router.post("/cancel/:teamId/:memberId", InvitationController.cancelInvitation);

export const InvitationRoutes = router;
