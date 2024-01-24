import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import validateRequest from "../middlewares/validateRequest";
import { TaskValidationSchema } from "../validation/task.validation";
const router = Router();

router.delete("/delete/:taskId", TaskController.deleteTask);

router.get("/by-project/:projectId", TaskController.getTasksByProjectId);

router.post(
  "/create",
  validateRequest(TaskValidationSchema.createZodSchema),
  TaskController.createTask
);

router.patch(
  "/update-status/:taskId",
  validateRequest(TaskValidationSchema.createZodSchema),
  TaskController.updateTaskStatus
);

router.patch(
  "/task-update/:id",
  validateRequest(TaskValidationSchema.createZodSchema),
  TaskController.updateTask
);

export const TaskRoutes = router;
