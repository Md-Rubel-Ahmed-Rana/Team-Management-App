import { Router } from "express";

import validateRequest from "../middlewares/validateRequest";
import { TeamController } from "../controllers/team.controller";
import { TeamValidationSchema } from "../validation/team.validation";

const router = Router();

router.get("/my-teams/:adminId", TeamController.myTeams);
router.get("/", TeamController.allTeams);

router.get("/:id", TeamController.getSpecificTeam);

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

export const TeamRouter = router;
