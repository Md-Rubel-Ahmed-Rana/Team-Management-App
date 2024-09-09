import { InvitationController } from "@/controllers/invitation.controller";
import packageLimitMiddleware from "@/middlewares/packageLimitMiddleware";
import { Router } from "express";

const router = Router();

router.post(
  "/send/:teamId/:memberId",
  packageLimitMiddleware.teamMemberAdd,
  InvitationController.sendInvitation
);

router.get("/pending/:memberId", InvitationController.pendingInvitation);

router.post("/reject/:teamId/:memberId", InvitationController.rejectInvitation);

router.post(
  "/accept/:teamId/:memberId",
  packageLimitMiddleware.teamMemberAdd,
  InvitationController.acceptInvitation
);

router.post("/cancel/:teamId/:memberId", InvitationController.cancelInvitation);

export const InvitationRoutes = router;
