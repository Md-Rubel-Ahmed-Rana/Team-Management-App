import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
const router = Router();

router.delete("/delete/:taskId", TaskController.deleteTask);

router.get("/by-project/:projectId", TaskController.getTasksByProjectId);

router.post("/create", TaskController.createTask);

router.patch("/update-status/:taskId", TaskController.updateTaskStatus);

router.patch("/task-update/:id", TaskController.updateTask);

export const TaskRoutes = router;
