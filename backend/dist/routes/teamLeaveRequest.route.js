"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamLeaveRequestRoutes = void 0;
const teamLeaveRequest_controller_1 = require("@/controllers/teamLeaveRequest.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/send-request", teamLeaveRequest_controller_1.TeamLeaveRequestController.requestToLeave);
router.patch("/ignore/:requestId", teamLeaveRequest_controller_1.TeamLeaveRequestController.ignoreRequest);
router.patch("/accept/:teamId/:memberId", teamLeaveRequest_controller_1.TeamLeaveRequestController.acceptLeaveRequest);
router.get("/all/:adminId", teamLeaveRequest_controller_1.TeamLeaveRequestController.getLeaveRequestByAdmin);
router.get("/member-request/:memberId", teamLeaveRequest_controller_1.TeamLeaveRequestController.getMemberRequest);
exports.TeamLeaveRequestRoutes = router;
