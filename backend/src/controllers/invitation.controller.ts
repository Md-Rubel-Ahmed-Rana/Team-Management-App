import { Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  sendInvitation = this.catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;
    const result = await InvitationService.sendInvitation(teamId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Invitation sent successfully!",
      data: result,
    });
  });

  pendingInvitation = this.catchAsync(async (req: Request, res: Response) => {
    const memberId = req.params.memberId;
    const result = await InvitationService.pendingInvitation(memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pending invitations found successfully!",
      data: result,
    });
  });

  rejectInvitation = this.catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;
    const result = await InvitationService.rejectInvitation(teamId, memberId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Invitation rejected successfully!",
      data: result,
    });
  });

  acceptInvitation = this.catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const memberId = req.params.memberId;
    const result = await InvitationService.acceptInvitation(teamId, memberId);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Invitation accepted successfully!",
      data: result,
    });
  });
}

export const InvitationController = new Controller();
