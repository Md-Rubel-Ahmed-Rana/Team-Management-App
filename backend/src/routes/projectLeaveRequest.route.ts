import { ProjectLeaveRequestController } from "@/controllers/projectLeaveRequest.controller";
import { Router } from "express";

const router = Router();

router.post("/sent-request", ProjectLeaveRequestController.requestToLeave);

router.patch("/ignore/:requestId", ProjectLeaveRequestController.ignoreRequest);

router.get(
  "/all/:adminId",
  ProjectLeaveRequestController.getLeaveRequestByAdmin
);

router.get(
  "/member-request/:memberId",
  ProjectLeaveRequestController.getMemberRequest
);

export const ProjectLeaveRequestRoutes = router;
