import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";

const router = Router();

router.get("/by-team/:teamId", ProjectController.getProjectsByTeamId);

router.post("/create", ProjectController.createProject);

router.patch("/update/:id", ProjectController.updateProject);

router.post("/add-member", ProjectController.addMember);

router.get("/my-projects/:userId", ProjectController.myProjects);

router.get("/single/:id", ProjectController.getSingleProject);

export const ProjectRoutes = router;
