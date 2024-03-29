"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglOAuthRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
require("../configurations/passport");
const googleOAuth_controller_1 = require("../controllers/googleOAuth.controller");
router.get("/login", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/callback", passport_1.default.authenticate("google", { failureRedirect: "/login" }), googleOAuth_controller_1.GoogleOAuthController.login);
exports.GooglOAuthRoutes = router;
