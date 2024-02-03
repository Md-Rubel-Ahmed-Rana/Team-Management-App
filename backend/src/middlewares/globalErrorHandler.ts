import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import handleValidationError from "./handleValidationError";
import handleZodError from "@/errors/handleZodError";
import ApiError from "@/shared/apiError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Global Error Handler`, { error });

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages = [];

  // err.message instanceof mongoose.Error.CastError
  if (error.name === "CastError") {
    console.log("Cast error");
    return new Error(`Invalid ${error?.path}: ${error?.value}`);
  }

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    statusCode,
  });
};

export default globalErrorHandler;
