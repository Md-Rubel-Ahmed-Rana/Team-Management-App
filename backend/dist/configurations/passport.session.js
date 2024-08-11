"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiatePassportSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const envConfig_1 = require("./envConfig");
const initiatePassportSession = (app) => {
    app.use((0, express_session_1.default)({
        secret: envConfig_1.config.google.clientSecret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Serialize user into the session
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    // Deserialize user from the session
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
exports.initiatePassportSession = initiatePassportSession;
