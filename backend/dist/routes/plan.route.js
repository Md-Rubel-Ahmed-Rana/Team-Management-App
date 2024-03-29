"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanRoutes = void 0;
const plan_controller_1 = require("@/controllers/plan.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", auth_1.default, plan_controller_1.PlanController.createPlan);
router.get("/", plan_controller_1.PlanController.getPlans);
router.get("/single/:id", plan_controller_1.PlanController.getSinglePlan);
exports.PlanRoutes = router;
