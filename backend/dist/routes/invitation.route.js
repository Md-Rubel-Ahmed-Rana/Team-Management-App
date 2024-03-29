"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationRoutes = void 0;
const invitation_controller_1 = require("@/controllers/invitation.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/send/:teamId/:memberId", auth_1.default, invitation_controller_1.InvitationController.sendInvitation);
router.get("/pending/:memberId", auth_1.default, invitation_controller_1.InvitationController.pendingInvitation);
router.post("/reject/:teamId/:memberId", auth_1.default, invitation_controller_1.InvitationController.rejectInvitation);
router.post("/accept/:teamId/:memberId", auth_1.default, invitation_controller_1.InvitationController.acceptInvitation);
exports.InvitationRoutes = router;
