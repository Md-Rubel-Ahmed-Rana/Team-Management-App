import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import validateRequest from "../middlewares/validateRequest";
import { ProjectValidationSchema } from "../validation/project.validation";
import verifyJwt from "../middlewares/auth";

const router = Router();

router.get(
  "/by-team/:teamId",
  verifyJwt,
  ProjectController.getProjectsByTeamId
);

router.post(
  "/create",
  verifyJwt,
  validateRequest(ProjectValidationSchema.createZodSchema),
  ProjectController.createProject
);

router.patch(
  "/update/:id",
  verifyJwt,
  validateRequest(ProjectValidationSchema.updateZodSchema),
  ProjectController.updateProject
);

router.post("/add-member", verifyJwt, ProjectController.addMember);

router.post("/remove-member", verifyJwt, ProjectController.removeMember);

router.get("/my-projects/:userId", verifyJwt, ProjectController.myProjects);

router.get(
  "/assigned-projects/:memberId",
  verifyJwt,
  ProjectController.assignedProjects
);

router.get("/single/:id", verifyJwt, ProjectController.getSingleProject);

export const ProjectRoutes = router;
