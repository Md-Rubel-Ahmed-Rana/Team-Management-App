import { NextFunction, Request, Response } from "express";
import { TeamService } from "../services/team.service";

const createTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TeamService.createTeam(req.body);

    res.json({
      statusCode: 201,
      success: true,
      message: "Successfully created team",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const myTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TeamService.myTeams(req.params.adminId);

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully found teams",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const allTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TeamService.allTeams();

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully found teams",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSpecificTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await TeamService.getTeam(req.params.id);

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully found team",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TeamService.updateTeam(req.params.id, req.body);

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully updated team",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TeamService.deleteTeam(req.params.id);

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully deleted team",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team_id = req.params.team_id;
    const member_id = req.params.member_id;
    const result = await TeamService.removeMember(team_id, member_id);

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully removed member",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const TeamController = {
  createTeam,
  myTeams,
  getSpecificTeam,
  updateTeam,
  deleteTeam,
  allTeams,
  removeMember,
};
