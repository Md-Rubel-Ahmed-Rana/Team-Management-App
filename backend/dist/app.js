"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const root_route_1 = require("./routes/root.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const dtoMapper_1 = __importDefault(require("./configurations/dtoMapper"));
const morgan_1 = __importDefault(require("morgan"));
require("./configurations/passport");
const socket_io_2 = require("./configurations/socket.io");
const passport_session_1 = require("./configurations/passport.session");
const apiRateLimiter_1 = require("./configurations/apiRateLimiter");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://team-management-app-client.vercel.app",
            "https://team-manager-eight.vercel.app",
        ],
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://team-manager-eight.vercel.app"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(apiRateLimiter_1.apiLimiter);
// initialize passport session
(0, passport_session_1.initiatePassportSession)(app);
// * Mappers initiate
(0, dtoMapper_1.default)();
// base route to check application health
app.get("/", (req, res) => {
    res.status(http_status_1.default.OK).json({
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team Manager server is running",
        data: null,
    });
});
// routes
app.use(root_route_1.RootRoutes);
app.use(globalErrorHandler_1.default.globalErrorHandler);
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
// Connecting to Socket.IO
(0, socket_io_2.initiateSocketIo)(io);
exports.default = server;
