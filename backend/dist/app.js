"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const root_route_1 = require("./routes/root.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
require("./configurations/passport");
const socket_io_2 = require("./configurations/socket.io");
const passport_session_1 = require("./configurations/passport.session");
const notFoundError_1 = __importDefault(require("./errors/notFoundError"));
const appMiddlewares_1 = __importDefault(require("./middlewares/appMiddlewares"));
const cors_1 = require("./configurations/cors");
const healthCheck_1 = __importDefault(require("./utils/healthCheck"));
const cloudinary_1 = require("./middlewares/cloudinary");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: cors_1.corsConfig,
});
// app middlewares
(0, appMiddlewares_1.default)(app);
// initialize passport session
(0, passport_session_1.initiatePassportSession)(app);
app.post("/new-post", cloudinary_1.upload.single("file"), (0, cloudinary_1.uploadSingleFile)("profile"), (req, res) => {
    const data = Object.assign(Object.assign({}, req.body), { url: req.link || "" });
    res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: data,
    });
});
app.post("/multiple", cloudinary_1.upload.array("files"), (0, cloudinary_1.uploadMultipleFiles)("projects"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: req.links || [],
    });
});
// app health check
(0, healthCheck_1.default)(app);
// api endpoints
app.use(root_route_1.RootRoutes);
// global error handler
app.use(globalErrorHandler_1.default.globalErrorHandler);
// handle 404 not found error
(0, notFoundError_1.default)(app);
// Connecting to Socket.IO
(0, socket_io_2.initiateSocketIo)(io);
exports.default = server;
