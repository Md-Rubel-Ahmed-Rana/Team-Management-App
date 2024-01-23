import { NextFunction, Request, RequestHandler, Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

class Controller {
  constructor() {}
  asyncController(fn: RequestHandler) {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }

  apiResponse<T>(res: Response, data: IApiResponse<T>): void {
    const responseData: IApiResponse<T> = {
      statusCode: data.statusCode,
      success: data.success,
      message: data.message || null,
      data: data.data || null || undefined,
    };

    res.status(data.statusCode).json(responseData);
  }
}

export const RootController = new Controller();
