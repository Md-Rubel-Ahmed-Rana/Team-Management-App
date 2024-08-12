"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const healthCheck = (app) => {
    app.get("/", (req, res) => {
        res.status(http_status_1.default.OK).json({
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Team Manager server is running",
            data: null,
        });
    });
};
exports.default = healthCheck;
