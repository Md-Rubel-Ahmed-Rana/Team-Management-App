"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.JwtInstance = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const user_service_1 = require("@/services/user.service");
const cookies_1 = require("@/utils/cookies");
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.signToken = (payload, secret, expiresIn) => __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
        });
        this.generateAccessToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            return this.signToken(payload, envConfig_1.config.jwt.accessTokenSecret, envConfig_1.config.jwt.accessTokenExpired);
        });
        this.generateRefreshToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            return this.signToken(payload, envConfig_1.config.jwt.refreshTokenSecret, envConfig_1.config.jwt.refreshTokenExpired);
        });
        this.verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { tmAccessToken: accessToken, tmRefreshToken: refreshToken } = req.cookies;
            try {
                const user = jsonwebtoken_1.default.verify(accessToken, envConfig_1.config.jwt.accessTokenSecret);
                req.id = user.id;
                req.email = user.email;
                return next();
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    return this.handleExpiredAccessToken(refreshToken, res, next);
                }
                // Handle other potential errors (e.g., invalid token)
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    statusCode: http_status_1.default.UNAUTHORIZED,
                    success: false,
                    message: "Unauthorized access",
                });
            }
        });
        this.handleExpiredAccessToken = (refreshToken, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(refreshToken, envConfig_1.config.jwt.refreshTokenSecret);
                const payload = { id: result.id, email: result.email };
                const newAccessToken = yield this.generateAccessToken(payload);
                const newRefreshToken = yield this.generateRefreshToken(payload);
                cookies_1.cookieManager.setTokens(res, newAccessToken, newRefreshToken);
                const user = yield user_service_1.UserService.findUserById(payload.id);
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Tokens rotated",
                    data: user,
                });
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    return this.logoutUser(res);
                }
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    statusCode: http_status_1.default.UNAUTHORIZED,
                    success: false,
                    message: "Invalid refresh token",
                });
            }
        });
        this.logoutUser = (res) => {
            cookies_1.cookieManager.clearTokens(res);
            return res.status(http_status_1.default.OK).json({
                statusCode: http_status_1.default.OK,
                success: true,
                message: "You have logged out",
                data: null,
            });
        };
    }
}
exports.JwtInstance = new JWT();
