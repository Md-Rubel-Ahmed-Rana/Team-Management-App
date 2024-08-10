import { config } from "@/configurations/envConfig";
import { UserService } from "@/services/user.service";
import { cookieManager } from "@/utils/cookies";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";

class JWT {
  private signToken = async (
    payload: { id: Types.ObjectId | string; email: string },
    secret: string,
    expiresIn: number | string
  ): Promise<string> => {
    return jwt.sign(payload, secret, { expiresIn });
  };

  public generateAccessToken = async (payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.accessTokenSecret,
      config.jwt.accessTokenExpired
    );
  };

  public generateRefreshToken = async (payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      config.jwt.refreshTokenSecret,
      config.jwt.refreshTokenExpired
    );
  };

  public verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { tmAccessToken: accessToken, tmRefreshToken: refreshToken } =
      req.cookies;

    try {
      const user = jwt.verify(accessToken, config.jwt.accessTokenSecret) as {
        id: string;
        email: string;
      };
      req.id = user.id;
      req.email = user.email;
      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.handleExpiredAccessToken(refreshToken, res, next);
      }

      // Handle other potential errors (e.g., invalid token)
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Unauthorized access",
      });
    }
  };

  private handleExpiredAccessToken = async (
    refreshToken: string,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = jwt.verify(
        refreshToken,
        config.jwt.refreshTokenSecret
      ) as {
        id: string;
        email: string;
      };

      const payload = { id: result.id, email: result.email };
      const newAccessToken = await this.generateAccessToken(payload);
      const newRefreshToken = await this.generateRefreshToken(payload);
      cookieManager.setTokens(res, newAccessToken, newRefreshToken);

      const user = await UserService.findUserById(payload.id);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        success: true,
        message: "Tokens rotated",
        data: user,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return this.logoutUser(res);
      }

      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid refresh token",
      });
    }
  };

  private logoutUser = (res: Response) => {
    cookieManager.clearTokens(res);
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "You have logged out",
      data: null,
    });
  };
}

export const JwtInstance = new JWT();
