import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import validateRequest from "../middlewares/validateRequest";
import { ProjectValidationSchema } from "../validation/project.validation";

const router = Router();

router.get("/by-team/:teamId", ProjectController.getProjectsByTeamId);

router.post(
  "/create",
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.createProject
);

router.patch(
  "/update/:id",
  validateRequest(ProjectValidationSchema.updateZodSchema),
  ProjectController.updateProject
);

router.post("/add-member",ProjectController.addMember);

router.post("/remove-member",ProjectController.removeMember);

router.get("/my-projects/:userId", ProjectController.myProjects);

router.get("/assigned-projects/:memberId", ProjectController.assignedProjects);

router.get("/single/:id", ProjectController.getSingleProject);

export const ProjectRoutes = router;
