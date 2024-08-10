"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const task_controller_1 = require("@/controllers/task.controller");
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const task_validation_1 = require("@/validations/task.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.delete("/delete/:taskId", task_controller_1.TaskController.deleteTask);
router.get("/by-project/:projectId", task_controller_1.TaskController.getTasksByProjectId);
router.post("/create", (0, validateRequest_1.default)(task_validation_1.TaskValidationSchema.createZodSchema), task_controller_1.TaskController.createTask);
router.patch("/update-status/:taskId", (0, validateRequest_1.default)(task_validation_1.TaskValidationSchema.updateZodSchema), task_controller_1.TaskController.updateTaskStatus);
router.patch("/task-update/:id", (0, validateRequest_1.default)(task_validation_1.TaskValidationSchema.updateZodSchema), task_controller_1.TaskController.updateTask);
exports.TaskRoutes = router;
