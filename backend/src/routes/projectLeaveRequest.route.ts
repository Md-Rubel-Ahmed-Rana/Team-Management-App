import { ProjectLeaveRequestController } from './../controllers/projectLeaveRequest.controller';
import { Router } from "express";

const router = Router();

router.post("/sent-request", ProjectLeaveRequestController.requestToLeave)

router.patch("/ignore/:projectId/:memberId", ProjectLeaveRequestController.ignoreRequest)

router.get("/all/:adminId", ProjectLeaveRequestController.getLeaveRequestByAdmin)

export const ProjectLeaveRequestRoutes = router