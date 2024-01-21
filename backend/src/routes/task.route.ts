import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
const router = Router();
router.get("/by-project/:projectId", TaskController.getTasksByProjectId);

router.post("/create", TaskController.createTask);

router.patch("/update-status/:taskId", TaskController.updateTaskStatus);

router.delete("/:taskId", TaskController.deleteTask);

export const TaskRoutes = router;
