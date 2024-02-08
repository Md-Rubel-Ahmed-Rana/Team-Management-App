import { ProjectController } from "@/controllers/project.controller";
import verifyJwt from "@/middlewares/auth";
import validateRequest from "@/middlewares/validateRequest";
import { ProjectValidationSchema } from "@/validations/project.validation";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.createProject
);

router.get("/my-projects/:userId", ProjectController.myProjects);

router.get("/assigned-projects/:memberId", ProjectController.assignedProjects);

router.patch(
  "/update/:id",
  validateRequest(ProjectValidationSchema.updateZodSchema),
  ProjectController.updateProject
);

router.post("/add-member", verifyJwt, ProjectController.addMember);

router.post("/remove-member", verifyJwt, ProjectController.removeMember);

router.get("/single/:id", verifyJwt, ProjectController.getSingleProject);

export const ProjectRoutes = router;
