import { ProjectService } from "@/services/project.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";
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

  assignedProjects = this.catchAsync(async (req: Request, res: Response) => {
    const memberId = req.params.memberId;
    const projects = await ProjectService.assignedProjects(memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects for assigned found",
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

  deleteProject = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProjectService.deleteProject(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project deleted successfully",
      data: result,
    });
  });

  getSingleProject = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ProjectService.getSingleProject(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project found",
      data: result,
    });
  });

  addMember = this.catchAsync(async (req: Request, res: Response) => {
    const { projectId, role, memberId } = req.body;
    const result = await ProjectService.addMember(projectId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member added successfully",
      data: result,
    });
  });

  removeMember = this.catchAsync(async (req: Request, res: Response) => {
    const { projectId, memberId } = req.body;
    const result = await ProjectService.removeMember(projectId, memberId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member removed successfully",
      data: result,
    });
  });
}

export const ProjectController = new Controller();
