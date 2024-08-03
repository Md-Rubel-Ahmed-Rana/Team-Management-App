"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const auth_service_1 = require("@/services/auth.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.googleLogin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req === null || req === void 0 ? void 0 : req.user) {
                const tokens = yield auth_service_1.AuthService.googleLogin(req.user);
                this.setCookies(res, tokens);
                res.redirect(envConfig_1.config.google.redirectUrl);
            }
        }));
        this.facebookLogin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req === null || req === void 0 ? void 0 : req.user) {
                const tokens = yield auth_service_1.AuthService.facebookLogin(req.user);
                this.setCookies(res, tokens);
                res.redirect(envConfig_1.config.facebook.redirectUrl);
            }
        }));
        this.githubLogin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req === null || req === void 0 ? void 0 : req.user) {
                const tokens = yield auth_service_1.AuthService.githubLogin(req.user);
                this.setCookies(res, tokens);
                res.redirect(envConfig_1.config.github.redirectUrl);
            }
        }));
        this.twitterLogin = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req === null || req === void 0 ? void 0 : req.user) {
                const tokens = yield auth_service_1.AuthService.twitterLogin(req.user);
                this.setCookies(res, tokens);
                res.redirect(envConfig_1.config.twitter.redirectUrl);
            }
        }));
    }
    setCookies(res, tokens) {
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
}
exports.AuthController = new Controller();
