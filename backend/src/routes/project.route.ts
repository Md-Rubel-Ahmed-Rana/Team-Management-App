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
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.updateProject
);

router.post(
  "/add-member",
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.addMember
);

router.get("/my-projects/:userId", ProjectController.myProjects);

router.get("/single/:id", ProjectController.getSingleProject);

export const ProjectRoutes = router;
