import { Request, Response } from "express";
import { GoogleOAuthService } from "../services/googleOAuth.service";
import RootController from "../shared/rootController";

class Controller extends RootController {
    login = this.catchAsync(async(req: Request, res: Response) => {
        if(req?.user){
            const result: string = await GoogleOAuthService.login(req.user)
            res.cookie("tmAccessToken", result);
            res.redirect("http://localhost:3000/dashboard")
        }
    })
}

export const GoogleOAuthController = new Controller()