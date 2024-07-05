"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    try {
        const token = req.cookies.tmAccessToken;
        if (!token) {
            return res.json({
                statusCode: http_status_1.default.BAD_REQUEST,
                success: false,
                message: "Token not provided",
                data: null,
            });
        }
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        if (!user) {
            return res.json({
                statusCode: http_status_1.default.UNAUTHORIZED,
                success: false,
                message: "Invalid token provided",
                data: null,
            });
        }
        req.id = user.id;
        req.email = user.email;
        next();
    }
    catch (error) {
        res.json({
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "There was an error verifying the token",
            error: error.message,
        });
    }
};
exports.default = verifyJwt;
