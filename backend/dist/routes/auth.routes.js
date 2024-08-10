"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("@/controllers/auth.controller");
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const user_validation_1 = require("@/validations/user.validation");
const express_1 = require("express");
const jwt_1 = require("lib/jwt");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/", jwt_1.JwtInstance.verifyToken, auth_controller_1.AuthController.auth);
router.post("/login", (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.loginZodSchema), auth_controller_1.AuthController.login);
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
router.delete("/logout", jwt_1.JwtInstance.verifyToken, auth_controller_1.AuthController.logout);
exports.AuthRoutes = router;
