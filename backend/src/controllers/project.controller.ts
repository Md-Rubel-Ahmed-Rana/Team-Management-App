import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  createProject = this.catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.createProject(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Project created successfully",
      data: result,
    });
  });

  getProjectsByTeamId = this.catchAsync(async (req: Request, res: Response) => {
    const teamId = req.params.teamId;
    const projects = await ProjectService.getProjectsByTeamId(teamId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects found",
      data: projects,
    });
  });

  myProjects = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const projects = await ProjectService.myProjects(userId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects found",
      data: projects,
    });
  });

  updateProject = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProjectService.updateProject(id, req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  });

  getSingleProject = this.catchAsync(async (req: Request, res: Response) => {
    console.log("Inside getSingleProject Controller", req.params.id);
    if (req.params.id !== "undefined") {
      console.log("Inside if clause");
      const id = req.params.id;
      const result = await ProjectService.getSingleProject(id);
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project found",
        data: result,
      });
    }
  });

  addMember = this.catchAsync(async (req: Request, res: Response) => {
    const { projectId, role, memberId } = req.body;
    const result = await ProjectService.addMember(projectId, memberId, role);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member added successfully",
      data: result,
    });
  });
}

export const ProjectController = new Controller();
