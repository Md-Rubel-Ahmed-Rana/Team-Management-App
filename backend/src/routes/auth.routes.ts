import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";
import passport from "passport";
const router = Router();

// google route
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthController.googleLogin
);

// facebook route
router.get("/facebook/login", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  AuthController.facebookLogin
);

// github route
router.get("/github/login", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  AuthController.githubLogin
);

// twitter route
router.get("/twitter/login", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  AuthController.twitterLogin
);

export const AuthRoutes = router;
