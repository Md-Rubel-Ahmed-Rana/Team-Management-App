import { Router } from "express";

import validateRequest from "../middlewares/validateRequest";
import { TeamController } from "../controllers/team.controller";
import { TeamValidationSchema } from "../validation/team.validation";

const router = Router();

router.get("/my-teams/:adminId", TeamController.myTeams);

router.get("/", TeamController.allTeams);

router.get("/active-members/:teamId", TeamController.getActiveMembers);

router.get("/:id", TeamController.getTeam);

router.get("/userTeams/:memberId", TeamController.getUserTeams);

router.get("/joined-teams/:memberId", TeamController.joinedTeams);

router.patch(
  "/:id",
  validateRequest(TeamValidationSchema.updateTeamValidation),
  TeamController.updateTeam
);

router.delete("/:id", TeamController.deleteTeam);

router.post(
  "/create",
  validateRequest(TeamValidationSchema.createTeamValidation),
  TeamController.createTeam
);

router.patch("/remove-member/:team_id/:member_id", TeamController.removeMember);

export const TeamRoutes = router;
