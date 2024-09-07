import { CacheServiceInstance } from "@/services/cache.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const userCacheMiddleware = {
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersFromCache =
        await CacheServiceInstance.user.getAllUsersFromCache();
      if (usersFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Users fetched successfully from cache",
          data: usersFromCache,
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
      const userFromCache =
        await CacheServiceInstance.user.getSingleUserFromCache(id);
      if (userFromCache) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "User fetched successfully from cache",
          data: userFromCache,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default userCacheMiddleware;
