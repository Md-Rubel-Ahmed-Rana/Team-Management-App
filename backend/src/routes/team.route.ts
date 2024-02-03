import { TeamController } from "@/controllers/team.controller";
import verifyJwt from "@/middlewares/auth";
import validateRequest from "@/middlewares/validateRequest";
import { TeamValidationSchema } from "@/validations/team.validation";
import { Router } from "express";
const router = Router();

router.get("/my-teams/:adminId", verifyJwt, TeamController.myTeams);

router.get("/", verifyJwt, TeamController.allTeams);

router.get(
  "/active-members/:teamId",
  verifyJwt,
  TeamController.getActiveMembers
);

router.get("/:id", verifyJwt, TeamController.getTeam);

router.get("/userTeams/:memberId", verifyJwt, TeamController.getUserTeams);

router.get("/joined-teams/:memberId", verifyJwt, TeamController.joinedTeams);

router.delete("/:id", verifyJwt, TeamController.deleteTeam);

router.post(
  "/create",
  verifyJwt,
  validateRequest(TeamValidationSchema.createTeamValidation),
  TeamController.createTeam
);

router.patch(
  "/remove-member/:teamId/:memberId",
  verifyJwt,
  TeamController.removeMember
);

router.patch(
  "/:id",
  verifyJwt,
  validateRequest(TeamValidationSchema.updateTeamValidation),
  TeamController.updateTeam
);

export const TeamRoutes = router;
