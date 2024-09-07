import { TeamController } from "@/controllers/team.controller";
import { upload, uploadSingleFile } from "@/middlewares/cloudinary";
import teamCacheMiddleware from "@/middlewares/teamCacheMiddleware";
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

router.get("/", teamCacheMiddleware.all, TeamController.getAllTeams);

router.get(
  "/single/:id",
  teamCacheMiddleware.single,
  TeamController.getSingleTeam
);

router.get(
  "/my-teams/:adminId",
  teamCacheMiddleware.myTeams,
  TeamController.getMyTeams
);

router.get(
  "/joined-teams/:memberId",
  teamCacheMiddleware.joinedTeams,
  TeamController.getJoinedTeams
);

router.delete("/delete/:id", TeamController.deleteTeam);

router.post(
  "/send-leave-request/:teamId/:memberId",
  TeamController.sendLeaveRequest
);

router.post(
  "/cancel-leave-request/:teamId/:memberId",
  TeamController.cancelLeaveRequest
);

router.post(
  "/reject-leave-request/:teamId/:memberId",
  TeamController.rejectLeaveRequest
);

router.post(
  "/accept-leave-request/:teamId/:memberId",
  TeamController.acceptLeaveRequest
);

router.delete("/remove-member/:teamId/:memberId", TeamController.removeMember);

router.patch(
  "/update/:id",
  upload.single("file"),
  uploadSingleFile("team-logos"),
  validateRequest(TeamValidationSchema.updateTeamValidation),
  TeamController.updateTeam
);

export const TeamRoutes = router;
