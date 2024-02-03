import { InvitationController } from "@/controllers/invitation.controller";
import verifyJwt from "@/middlewares/auth";
import { Router } from "express";

const router = Router();

router.post(
  "/send/:teamId/:memberId",
  verifyJwt,
  InvitationController.sendInvitation
);

router.get(
  "/pending/:memberId",
  verifyJwt,
  InvitationController.pendingInvitation
);

router.post(
  "/reject/:teamId/:memberId",
  verifyJwt,
  InvitationController.rejectInvitation
);

router.post(
  "/accept/:teamId/:memberId",
  verifyJwt,
  InvitationController.acceptInvitation
);

export const InvitationRoutes = router;
