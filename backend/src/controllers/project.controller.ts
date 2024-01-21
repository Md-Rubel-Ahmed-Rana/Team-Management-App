// Project Controller
import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/project.service";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await ProjectService.createProject(req.body);

    res.json({
      statusCode: 201,
      success: true,
      message: "Successfully created project",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectsByTeamId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teamId = req.params.teamId;
    const projects = await ProjectService.getProjectsByTeamId(teamId);

    res.json({
      statusCode: 200,
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

export const ProjectController = {
  createProject,
  getProjectsByTeamId,
};
