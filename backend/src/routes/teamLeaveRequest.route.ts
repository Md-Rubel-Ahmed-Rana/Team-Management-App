import { TeamLeaveRequestController } from "@/controllers/teamLeaveRequest.controller";
import verifyJwt from "@/middlewares/auth";
import { Router } from "express";

const router = Router();

router.post(
  "/sent-request",
  verifyJwt,
  TeamLeaveRequestController.requestToLeave
);

router.patch(
  "/ignore/:requestId",
  verifyJwt,
  TeamLeaveRequestController.ignoreRequest
);

router.get("/all/:adminId", TeamLeaveRequestController.getLeaveRequestByAdmin);

router.get(
  "/member-request/:memberId",
  verifyJwt,
  TeamLeaveRequestController.getMemberRequest
);

export const TeamLeaveRequestRoutes = router;
