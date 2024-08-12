"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handle404NotFoundError = (app) => {
    app.use((req, res, next) => {
        res.status(http_status_1.default.NOT_FOUND).json({
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Not Found",
            errorMessages: [
                {
                    path: req.originalUrl,
                    message: "API Not Found",
                },
            ],
        });
        next();
    });
};
exports.default = handle404NotFoundError;
