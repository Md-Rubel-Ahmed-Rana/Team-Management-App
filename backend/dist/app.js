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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const helmet_1 = __importDefault(require("helmet"));
const envConfig_1 = require("./configurations/envConfig");
const root_route_1 = require("./routes/root.route");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const dtoMapper_1 = __importDefault(require("./configurations/dtoMapper"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:8080"],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, express_session_1.default)({
    secret: envConfig_1.config.google.clientSecret,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
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
// Serialize user into the session
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// Deserialize user from the session
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// Connecting to Socket.IO
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A user connected");
    // messaging room for a team
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });
    socket.on("message", (data) => {
        socket.to(data.conversationId).emit("message", data);
    });
    // notification room for each user
    socket.on("notification-room", (userId) => {
        console.log("notification room", userId);
        socket.join(userId);
    });
    socket.on("notification", (data) => {
        console.log("New notification", data);
        socket.to(data.recipient.userId).emit("notification", data);
    });
    // tasks room
    socket.on("task-room", (projectId) => {
        console.log("task room", projectId);
        socket.join(projectId);
    });
    socket.on("task", (data) => {
        console.log("New task", data);
        socket.to(data.project).emit("task", data);
    });
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("User disconnected");
    }));
}));
exports.default = server;
