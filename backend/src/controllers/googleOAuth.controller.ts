import { config } from "@/configurations/envConfig";
import { GoogleOAuthService } from "@/services/googleOAuth.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";

class Controller extends RootController {
  login = this.catchAsync(async (req: Request, res: Response) => {
    if (req?.user) {
      const result: string = await GoogleOAuthService.login(req.user);
      res.cookie("tmAccessToken", result, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.redirect(config.google.redirectUrl);
    }
  });
}

export const GoogleOAuthController = new Controller();
