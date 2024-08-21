import { deleteSingleFileFromCloudinary } from "@/utils/deletePreviousFileFromCloudinary";
import { TeamService } from "@/services/team.service";
import RootController from "@/shared/rootController";
import extractCloudinaryPublicId from "@/utils/getCloudinaryFilePublicIdFromUrl";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  createTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.createTeam({
      ...req.body,
      image: req.link || "",
    });
    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "team created successfully",
      data: result,
    });
  });
  getActiveMembers = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.teamId;
    const result = await TeamService.getActiveMembers(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team members found",
      data: result,
    });
  });

  getMyTeamsForCard = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.adminId;
    const result = await TeamService.getMyTeamsForCard(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Team cards found",
      data: result,
    });
  });

  getJoinedTeamsForCard = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.memberId;
      const result = await TeamService.getJoinedTeamsForCard(id);
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Joined Team cards found",
        data: result,
      });
    }
  );

  getSingleTeamWithDetails = this.catchAsync(
    async (req: Request, res: Response) => {
      const id = req.params.teamId;
      const result = await TeamService.getSingleTeamWithDetails(id);
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team details found",
        data: result,
      });
    }
  );

  myTeams = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.adminId;
    const result = await TeamService.myTeams(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  joinedTeams = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.memberId;
    const result = await TeamService.joinedTeams(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  getTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.getTeam(req.params.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team found",
      data: result,
    });
  });

  updateTeam = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (req.link) {
      const team = await TeamService.getTeamById(id);
      const teamLogo = team?.image;
      if (teamLogo) {
        const public_id = extractCloudinaryPublicId(teamLogo);
        if (public_id) {
          await deleteSingleFileFromCloudinary(public_id);
        }
      }
      const result = await TeamService.updateTeam(id, {
        ...req.body,
        image: req.link,
      });
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team updated successfully",
        data: result,
      });
    } else {
      const result = await TeamService.updateTeam(id, req.body);
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team updated successfully",
        data: result,
      });
    }
  });

  deleteTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.deleteTeam(req.params.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team deleted successfully",
      data: result,
    });
  });

  removeMember = this.catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;
    const result = await TeamService.removeMember(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team member removed successfully",
      data: result,
    });
  });
}

export const TeamController = new Controller();
