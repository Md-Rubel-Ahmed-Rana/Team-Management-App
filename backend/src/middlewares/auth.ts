import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.tmAccessToken;

    if (!token) {
      return res.json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Token not provided",
        data: null,
      });
    }

    const user: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );

    if (!user) {
      return res.json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid token provided",
        data: null,
      });
    }

    req.id = user.id;
    req.email = user.email;
    next();
  } catch (error: any) {
    res.json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "There was an error verifying the token",
      error: error.message,
    });
  }
};

export default verifyJwt;
