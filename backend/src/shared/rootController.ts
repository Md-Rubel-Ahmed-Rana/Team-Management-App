import { IApiResponse } from "@/interfaces/util";
import { NextFunction, Request, RequestHandler, Response } from "express";

class RootController {
  public model;
  constructor(model: any = "") {
    this.model = model;
  }
  catchAsync =
    (fn: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };

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

export default RootController;
