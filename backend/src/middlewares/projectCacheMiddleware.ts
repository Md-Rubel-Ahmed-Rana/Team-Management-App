import { CacheServiceInstance } from "@/services/cache.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const projectCacheMiddleware = {
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // await CacheServiceInstance.project.deleteAllProjectFromCache();
      const projectsFromCache =
        await CacheServiceInstance.project.getAllProjectsFromCache();
      if (projectsFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Projects Fetched From Cache",
          data: projectsFromCache,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  single: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const projectFromCache =
        await CacheServiceInstance.project.getSingleProjectFromCache(id);
      if (projectFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Project Fetched From Cache",
          data: projectFromCache,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  myProjects: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const myProjectFromCache =
        await CacheServiceInstance.project.getMyProjectsFromCache(userId);
      if (myProjectFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "My Projects Fetched From Cache",
          data: myProjectFromCache,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  assignedProjects: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId = req.params.memberId;
      const myProjectFromCache =
        await CacheServiceInstance.project.getAssignedProjectsFromCache(
          memberId
        );
      if (myProjectFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Assigned Projects Fetched From Cache",
          data: myProjectFromCache,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default projectCacheMiddleware;
