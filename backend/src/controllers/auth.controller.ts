import { config } from "@/configurations/envConfig";
import { ITokens } from "@/interfaces/util";
import { AuthService } from "@/services/auth.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";

class Controller extends RootController {
  setCookies(res: Response, tokens: ITokens): void {
    res.cookie("tmAccessToken", tokens.accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("tmRefreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
  }
  googleLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.googleLogin(req.user);
      this.setCookies(res, tokens);
      res.redirect(config.google.redirectUrl);
    }
  });
  facebookLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.facebookLogin(req.user);
      this.setCookies(res, tokens);
      res.redirect(config.facebook.redirectUrl);
    }
  });
  githubLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.githubLogin(req.user);
      this.setCookies(res, tokens);
      res.redirect(config.github.redirectUrl);
    }
  });
  twitterLogin = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const tokens: ITokens = await AuthService.twitterLogin(req.user);
      this.setCookies(res, tokens);
      res.redirect(config.twitter.redirectUrl);
    }
  });
}

export const AuthController = new Controller();
