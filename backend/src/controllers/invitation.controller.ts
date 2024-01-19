import { NextFunction, Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";

const sendInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team_id = req.params.team_id;
    const member_id = req.params.member_id;
    const result = await InvitationService.sendInvitation(team_id, member_id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Invitation sent successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const rejectInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team_id = req.params.team_id;
    const member_id = req.params.member_id;
    const result = await InvitationService.rejectInvitation(team_id, member_id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Invitation rejected successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const acceptInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team_id = req.params.team_id;
    const member_id = req.params.member_id;
    const result = await InvitationService.acceptInvitation(team_id, member_id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Invitation accepted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const InvitationController = {
  sendInvitation,
  rejectInvitation,
  acceptInvitation,
};
