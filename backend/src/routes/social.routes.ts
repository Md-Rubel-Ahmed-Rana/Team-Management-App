import { Router } from "express";
import passport from "passport";
const router = Router();
import "../configurations/passport";
import { SocialAuthController } from "@/controllers/socials.controller";

router.get(
  "/facebook/login",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  SocialAuthController.login
);

export const SocialAuthRoutes = router;
