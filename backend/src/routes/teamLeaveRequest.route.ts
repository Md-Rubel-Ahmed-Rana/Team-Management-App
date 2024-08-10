import { TeamLeaveRequestController } from "@/controllers/teamLeaveRequest.controller";
import { Router } from "express";

const router = Router();

router.post("/sent-request", TeamLeaveRequestController.requestToLeave);

router.patch("/ignore/:requestId", TeamLeaveRequestController.ignoreRequest);

router.get("/all/:adminId", TeamLeaveRequestController.getLeaveRequestByAdmin);

router.get(
  "/member-request/:memberId",
  TeamLeaveRequestController.getMemberRequest
);

export const TeamLeaveRequestRoutes = router;
