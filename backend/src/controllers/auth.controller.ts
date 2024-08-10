import { config } from "@/configurations/envConfig";
import { ITokens } from "@/interfaces/util";
import { AuthService } from "@/services/auth.service";
import RootController from "@/shared/rootController";
import { cookieManager } from "@/utils/cookies";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  auth = this.catchAsync(async (req: Request, res: Response) => {
    const id: any = req?.id;
    const result = await AuthService.auth(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched  successfully",
      data: result,
    });
  });
  login = this.catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await AuthService.login(
      email,
      password
    );
    cookieManager.setTokens(res, accessToken, refreshToken);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
      data: null,
    });
  });
  googleLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.googleLogin(req.user);
      cookieManager.setTokens(res, tokens.accessToken, tokens.refreshToken);
      res.redirect(config.google.redirectUrl);
    }
  });
  facebookLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.facebookLogin(req.user);
      cookieManager.setTokens(res, tokens.accessToken, tokens.refreshToken);
      res.redirect(config.facebook.redirectUrl);
    }
  });
  githubLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.githubLogin(req.user);
      cookieManager.setTokens(res, tokens.accessToken, tokens.refreshToken);
      res.redirect(config.github.redirectUrl);
    }
  });
  twitterLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.twitterLogin(req.user);
      cookieManager.setTokens(res, tokens.accessToken, tokens.refreshToken);
      res.redirect(config.twitter.redirectUrl);
    }
  });

  logout = this.catchAsync(async (req: Request, res: Response) => {
    cookieManager.clearTokens(res);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Logout successful",
      data: null,
    });
  });
}

export const AuthController = new Controller();
