import { CacheServiceInstance } from "@/services/cache.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const teamCacheMiddleware = {
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // await CacheServiceInstance.team.deleteAllTeamFromCache();
      const teams = await CacheServiceInstance.team.getAllTeamsFromCache();
      if (teams) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Teams Fetched From Cache",
          data: teams,
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
      const team = await CacheServiceInstance.team.getSingleTeamFromCache(id);
      if (team) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Team Fetched From Cache",
          data: team,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  myTeams: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.params.adminId;
      const myTeams = await CacheServiceInstance.team.getMyTeamsFromCache(
        adminId
      );
      if (myTeams) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "My Teams Fetched From Cache",
          data: myTeams,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
  joinedTeams: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId = req.params.memberId;
      const teams = await CacheServiceInstance.team.joinedTeams(memberId);
      if (teams) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Joined Projects Fetched From Cache",
          data: teams,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default teamCacheMiddleware;
