import verifyJwt from "../middlewares/auth";
import { ProjectLeaveRequestController } from "./../controllers/projectLeaveRequest.controller";
import { Router } from "express";

const router = Router();

router.post(
  "/sent-request",
  verifyJwt,
  ProjectLeaveRequestController.requestToLeave
);

router.patch(
  "/ignore/:requestId",
  verifyJwt,
  ProjectLeaveRequestController.ignoreRequest
);

router.get(
  "/all/:adminId",
  verifyJwt,
  ProjectLeaveRequestController.getLeaveRequestByAdmin
);

router.get(
  "/member-request/:memberId",
  verifyJwt,
  ProjectLeaveRequestController.getMemberRequest
);

export const ProjectLeaveRequestRoutes = router;
