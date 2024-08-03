"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialAuthRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
require("../configurations/passport");
const socials_controller_1 = require("@/controllers/socials.controller");
router.get("/facebook/login", passport_1.default.authenticate("facebook", { scope: ["profile", "email"] }));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), socials_controller_1.SocialAuthController.login);
exports.SocialAuthRoutes = router;
