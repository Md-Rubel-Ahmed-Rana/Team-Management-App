"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamLeaveRequestRoutes = void 0;
const teamLeaveRequest_controller_1 = require("@/controllers/teamLeaveRequest.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/sent-request", auth_1.default, teamLeaveRequest_controller_1.TeamLeaveRequestController.requestToLeave);
router.patch("/ignore/:requestId", auth_1.default, teamLeaveRequest_controller_1.TeamLeaveRequestController.ignoreRequest);
router.get("/all/:adminId", teamLeaveRequest_controller_1.TeamLeaveRequestController.getLeaveRequestByAdmin);
router.get("/member-request/:memberId", auth_1.default, teamLeaveRequest_controller_1.TeamLeaveRequestController.getMemberRequest);
exports.TeamLeaveRequestRoutes = router;
