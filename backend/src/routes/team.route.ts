import { TeamController } from "@/controllers/team.controller";
import verifyJwt from "@/middlewares/auth";
import validateRequest from "@/middlewares/validateRequest";
import { TeamValidationSchema } from "@/validations/team.validation";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  validateRequest(TeamValidationSchema.createTeamValidation),
  TeamController.createTeam
);

router.get("/my-teams/:adminId", TeamController.myTeams);

router.get("/joined-teams/:memberId", TeamController.joinedTeams);

router.get("/active-members/:teamId", TeamController.getActiveMembers);

router.get("/single/:id", TeamController.getTeam);

router.delete("/delete/:id", TeamController.deleteTeam);

router.patch(
  "/remove-member/:teamId/:memberId",
  verifyJwt,
  TeamController.removeMember
);

router.patch(
  "/update/:id",
  validateRequest(TeamValidationSchema.updateTeamValidation),
  TeamController.updateTeam
);

export const TeamRoutes = router;
