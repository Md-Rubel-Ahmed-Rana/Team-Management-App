import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({
        statusCode: 400,
        success: false,
        message: "Did't provide token",
        data: null,
      });
    }

    const user: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );

    if (!user) {
      return res.json({
        statusCode: 401,
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
      statusCode: 500,
      success: false,
      message: "There was an error to verify token",
      error: error.message,
    });
  }
};

export default verifyJwt;
