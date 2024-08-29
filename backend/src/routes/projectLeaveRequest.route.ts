import { ProjectLeaveRequestController } from "@/controllers/projectLeaveRequest.controller";
import { Router } from "express";

const router = Router();

router.post("/send-request", ProjectLeaveRequestController.requestToLeave);

router.patch("/ignore/:requestId", ProjectLeaveRequestController.ignoreRequest);

router.patch(
  "/accept/:projectId/:memberId",
  ProjectLeaveRequestController.acceptLeaveRequest
);

router.get(
  "/all/:adminId",
  ProjectLeaveRequestController.getLeaveRequestByAdmin
);

router.get(
  "/member-request/:memberId",
  ProjectLeaveRequestController.getMemberRequest
);

export const ProjectLeaveRequestRoutes = router;
