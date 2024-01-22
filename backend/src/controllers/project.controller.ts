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

const myProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const projects = await ProjectService.myProjects(userId);

    res.json({
      statusCode: 200,
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const project = await ProjectService.updateProject(id, req.body);

    res.json({
      statusCode: 200,
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const project = await ProjectService.getSingleProject(id);

    res.json({
      statusCode: 200,
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const addMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, role, memberId } = req.body;

    if (!projectId || !memberId) {
      return res
        .status(400)
        .json({ error: "projectId and memberId are required" });
    }

    const result = await ProjectService.addMember(projectId, memberId, role);
    if (result) {
      return res.status(200).json(result);
    }
    res
      .status(200)
      .json({ message: "Member added successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const ProjectController = {
  createProject,
  getProjectsByTeamId,
  myProjects,
  addMember,
  getSingleProject,
  updateProject,
};
