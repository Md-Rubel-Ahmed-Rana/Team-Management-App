import { TaskController } from "@/controllers/task.controller";
import verifyJwt from "@/middlewares/auth";
import validateRequest from "@/middlewares/validateRequest";
import { TaskValidationSchema } from "@/validations/task.validation";
import { Router } from "express";
const router = Router();

router.delete("/delete/:taskId", verifyJwt, TaskController.deleteTask);

router.get("/", verifyJwt, TaskController.getTasks);

router.get(
  "/by-project/:projectId",
  verifyJwt,
  TaskController.getTasksByProjectId
);

router.post(
  "/create",
  verifyJwt,
  validateRequest(TaskValidationSchema.createZodSchema),
  TaskController.createTask
);

router.patch(
  "/update-status/:taskId",
  verifyJwt,
  validateRequest(TaskValidationSchema.updateZodSchema),
  TaskController.updateTaskStatus
);

router.patch(
  "/task-update/:id",
  verifyJwt,
  validateRequest(TaskValidationSchema.updateZodSchema),
  TaskController.updateTask
);

export const TaskRoutes = router;
