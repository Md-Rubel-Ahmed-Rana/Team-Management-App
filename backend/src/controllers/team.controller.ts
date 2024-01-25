import { Request, Response } from "express";
import { TeamService } from "../services/team.service";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  createTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.createTeam(req.body);
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

  allTeams = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.allTeams();
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

  getUserTeams = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.getUserTeams(req.params.memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  updateTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.updateTeam(req.params.id, req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team updated successfully",
      data: result,
    });
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
