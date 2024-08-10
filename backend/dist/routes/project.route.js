"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const project_controller_1 = require("@/controllers/project.controller");
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const project_validation_1 = require("@/validations/project.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/create", (0, validateRequest_1.default)(project_validation_1.ProjectValidationSchema.createZodSchema), project_controller_1.ProjectController.createProject);
router.get("/my-projects/:userId", project_controller_1.ProjectController.myProjects);
router.get("/assigned-projects/:memberId", project_controller_1.ProjectController.assignedProjects);
router.patch("/update/:id", (0, validateRequest_1.default)(project_validation_1.ProjectValidationSchema.updateZodSchema), project_controller_1.ProjectController.updateProject);
router.post("/add-member", project_controller_1.ProjectController.addMember);
router.post("/remove-member", project_controller_1.ProjectController.removeMember);
router.get("/single/:id", project_controller_1.ProjectController.getSingleProject);
exports.ProjectRoutes = router;
