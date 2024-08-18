import { ProjectController } from "@/controllers/project.controller";
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

router.post("/add-member", ProjectController.addMember);

router.post("/remove-member", ProjectController.removeMember);

router.get("/single/:id", ProjectController.getSingleProject);

router.delete("/delete/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;
