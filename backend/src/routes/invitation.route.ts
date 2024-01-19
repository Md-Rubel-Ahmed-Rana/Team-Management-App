import { Router } from "express";
import { InvitationController } from "../controllers/invitation.controller";

const router = Router();

router.post("/send/:team_id/:member_id", InvitationController.sendInvitation);

router.post(
  "/reject/:team_id/:member_id",
  InvitationController.rejectInvitation
);

router.post(
  "/accept/:team_id/:member_id",
  InvitationController.acceptInvitation
);

export const InvitationRoutes = router;
