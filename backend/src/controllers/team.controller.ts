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

  getSingleTeam = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.getSingleTeam(req.params.id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Team found",
      data: result,
    });
  });

  getAllTeams = this.catchAsync(async (req: Request, res: Response) => {
    const result = await TeamService.getAllTeams();
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  getMyTeams = this.catchAsync(async (req: Request, res: Response) => {
    const adminId = req.params?.adminId;
    const result = await TeamService.getMyTeams(adminId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  getJoinedTeams = this.catchAsync(async (req: Request, res: Response) => {
    const memberId = req.params?.memberId;
    const result = await TeamService.getJoinedTeams(memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Teams found",
      data: result,
    });
  });

  updateTeam = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (req.link) {
      const team = await TeamService.getSingleTeam(id);
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

  sendLeaveRequest = this.catchAsync(async (req: Request, res: Response) => {
    const { teamId, memberId } = req.params;
    await TeamService.sendLeaveRequest(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your leave request has been sent to admin!",
      data: null,
    });
  });

  cancelLeaveRequest = this.catchAsync(async (req: Request, res: Response) => {
    const { teamId, memberId } = req.params;
    await TeamService.cancelLeaveRequest(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your leave request has been cancelled!",
      data: null,
    });
  });

  rejectLeaveRequest = this.catchAsync(async (req: Request, res: Response) => {
    const { teamId, memberId } = req.params;
    console.log({ teamId, memberId });
    await TeamService.rejectLeaveRequest(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Leave request has been rejected!",
      data: null,
    });
  });

  acceptLeaveRequest = this.catchAsync(async (req: Request, res: Response) => {
    const { teamId, memberId } = req.params;
    await TeamService.acceptLeaveRequest(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Leave request has been accepted! This member has been removed.",
      data: null,
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
