import { ProjectController } from "@/controllers/project.controller";
import projectCacheMiddleware from "@/middlewares/projectCacheMiddleware";
import validateRequest from "@/middlewares/validateRequest";
import { ProjectValidationSchema } from "@/validations/project.validation";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.createProject
);

router.get("/", projectCacheMiddleware.all, ProjectController.getAllProjects);

router.get(
  "/my-projects/:userId",
  projectCacheMiddleware.myProjects,
  ProjectController.myProjects
);

router.get(
  "/assigned-projects/:memberId",
  projectCacheMiddleware.assignedProjects,
  ProjectController.assignedProjects
);

router.patch(
  "/update/:id",
  validateRequest(ProjectValidationSchema.updateZodSchema),
  ProjectController.updateProject
);

router.get("/single/:id", ProjectController.getSingleProjectById);

router.delete("/delete/:id", ProjectController.deleteProject);

router.post("/add-member/:projectId/:memberId", ProjectController.addMember);

router.post(
  "/remove-member/:projectId/:memberId",
  ProjectController.removeMember
);

router.post(
  "/send-leave-request/:projectId/:memberId",
  ProjectController.sendLeaveRequest
);

router.post(
  "/cancel-leave-request/:projectId/:memberId",
  ProjectController.cancelLeaveRequest
);

router.post(
  "/reject-leave-request/:projectId/:memberId",
  ProjectController.rejectLeaveRequest
);

router.post(
  "/accept-leave-request/:projectId/:memberId",
  ProjectController.acceptLeaveRequest
);

export const ProjectRoutes = router;
