import { Router } from "express";
import { TeamLeaveRequestController } from "../controllers/teamLeaveRequest.controller";

const router = Router();

router.post("/sent-request", TeamLeaveRequestController.requestToLeave)

router.patch("/ignore/:teamId/:memberId", TeamLeaveRequestController.ignoreRequest)

router.get("/all/:adminId", TeamLeaveRequestController.getLeaveRequestByAdmin)

export const TeamLeaveRequestRoutes = router