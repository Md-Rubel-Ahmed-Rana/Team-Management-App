import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

router.get("/by-team/:teamId", ProjectController.getProjectsByTeamId);

router.post("/create", ProjectController.createProject);

export const ProjectRoutes = router;
