import redisClient from "@/configurations/redis";
import { INotification } from "@/interfaces/notification.interface";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

class RedisCache {
  async insertOne<T>(key: string, data: T, expireDate?: number) {
    const prevData = await this.getCachedData(key);
    if (prevData?.length > 0) {
      const newData = [...prevData, data];
      await redisClient.set(key, JSON.stringify(newData), { EX: expireDate });
    } else {
      await redisClient.set(key, JSON.stringify([data]), { EX: expireDate });
    }
  }

  async insertMany<T>(key: string, data: T, expireDate?: number) {
    await redisClient.set(key, JSON.stringify(data), { EX: expireDate });
  }

  findMany(key: string, message: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.getCachedData(key);
        if (data?.length > 0) {
          res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            success: true,
            message: message,
            data: data,
          });
        } else {
          next();
        }
      } catch (error) {
        next(error);
      }
    };
  }

  findNotification() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const key = req.params.userId;
        let data = await this.getCachedData(key);
        data = data.sort(
          (a: INotification, b: INotification) => b?.sortBy - a?.sortBy
        );
        res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Your notifications fetched",
          data: data,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  updateNotification() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const key = req.params.userId;
        const ids = req.body;
        let data = await this.getCachedData(key);
        const unchanged = data?.filter(
          (not: INotification) => !ids.includes(not?.id)
        );

        data = data?.map((notification: INotification) => {
          if (ids.includes(notification.id)) {
            notification.read = true;
          }
          return notification;
        });

        const updatedNotification = unchanged.concat(data);
        await redisClient.set(key, JSON.stringify(updatedNotification));

        res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          success: true,
          message: "Notifications marked as read",
          data: data,
        });
      } catch (error) {
        next(error);
      }
    };
  }

  async getCachedData(key: string) {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  async removeCache(key: string) {
    await redisClient.del(key);
  }
}

export const RedisCacheService = new RedisCache();
