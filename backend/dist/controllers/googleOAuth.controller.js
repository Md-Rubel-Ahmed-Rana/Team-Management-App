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
exports.GoogleOAuthController = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const googleOAuth_service_1 = require("@/services/googleOAuth.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.login = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req === null || req === void 0 ? void 0 : req.user) {
                const result = yield googleOAuth_service_1.GoogleOAuthService.login(req.user);
                res.cookie("tmAccessToken", result, { httpOnly: true, secure: true });
                res.redirect(envConfig_1.config.google.redirectUrl);
            }
        }));
    }
}
exports.GoogleOAuthController = new Controller();
