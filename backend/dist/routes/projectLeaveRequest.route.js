"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLeaveRequestRoutes = void 0;
const projectLeaveRequest_controller_1 = require("@/controllers/projectLeaveRequest.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/sent-request", auth_1.default, projectLeaveRequest_controller_1.ProjectLeaveRequestController.requestToLeave);
router.patch("/ignore/:requestId", auth_1.default, projectLeaveRequest_controller_1.ProjectLeaveRequestController.ignoreRequest);
router.get("/all/:adminId", projectLeaveRequest_controller_1.ProjectLeaveRequestController.getLeaveRequestByAdmin);
router.get("/member-request/:memberId", auth_1.default, projectLeaveRequest_controller_1.ProjectLeaveRequestController.getMemberRequest);
exports.ProjectLeaveRequestRoutes = router;
