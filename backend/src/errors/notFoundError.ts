import { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const handle404NotFoundError = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Not Found",
      errorMessages: [
        {
          path: req.originalUrl,
          message: "API Not Found",
        },
      ],
    });
    next();
  });
};

export default handle404NotFoundError;
