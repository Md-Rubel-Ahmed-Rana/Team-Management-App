import { TeamController } from "@/controllers/team.controller";
import { upload, uploadSingleFile } from "@/middlewares/cloudinary";
import validateRequest from "@/middlewares/validateRequest";
import { TeamValidationSchema } from "@/validations/team.validation";
import { Router } from "express";
const router = Router();

router.post(
  "/create",
  upload.single("file"),
  uploadSingleFile("team-logos"),
  validateRequest(TeamValidationSchema.createTeamValidation),
  TeamController.createTeam
);

router.get("/my-teams/:adminId", TeamController.myTeams);

router.get("/cards/my-teams/:adminId", TeamController.getMyTeamsForCard);

router.get(
  "/cards/joined-teams/:memberId",
  TeamController.getJoinedTeamsForCard
);

router.get("/joined-teams/:memberId", TeamController.joinedTeams);

router.get("/active-members/:teamId", TeamController.getActiveMembers);

router.get("/details/:teamId", TeamController.getSingleTeamWithDetails);

router.get("/single/:id", TeamController.getTeam);

router.delete("/delete/:id", TeamController.deleteTeam);

router.patch("/remove-member/:teamId/:memberId", TeamController.removeMember);

router.patch(
  "/update/:id",
  upload.single("file"),
  uploadSingleFile("team-logos"),
  validateRequest(TeamValidationSchema.updateTeamValidation),
  TeamController.updateTeam
);

export const TeamRoutes = router;
