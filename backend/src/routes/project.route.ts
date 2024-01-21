import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

router.get("/by-team/:teamId", ProjectController.getProjectsByTeamId);

router.post("/create", ProjectController.createProject);

router.get("/my-projects/:userId", ProjectController.myProjects);

export const ProjectRoutes = router;
