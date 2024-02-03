import { Router } from "express";
import passport from "passport";
const router = Router();
import "../configurations/passport";
import { GoogleOAuthController } from "../controllers/googleOAuth.controller";

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  GoogleOAuthController.login
);

export const GooglOAuthRoutes = router;
