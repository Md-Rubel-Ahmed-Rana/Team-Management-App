"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("@/controllers/auth.controller");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// google route
router.get("/google/login", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), auth_controller_1.AuthController.googleLogin);
// facebook route
router.get("/facebook/login", passport_1.default.authenticate("facebook"));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/" }), auth_controller_1.AuthController.facebookLogin);
// github route
router.get("/github/login", passport_1.default.authenticate("github"));
router.get("/github/callback", passport_1.default.authenticate("github", { failureRedirect: "/" }), auth_controller_1.AuthController.githubLogin);
// twitter route
router.get("/twitter/login", passport_1.default.authenticate("twitter"));
router.get("/twitter/callback", passport_1.default.authenticate("twitter", { failureRedirect: "/" }), auth_controller_1.AuthController.twitterLogin);
exports.AuthRoutes = router;
