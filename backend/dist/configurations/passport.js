"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oAuth_1 = require("@/utils/oAuth");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy(oAuth_1.strategyConfig, (accessToken, refreshToken, profile, cb) => {
    const { displayName, emails, photos } = profile;
    if (displayName && emails && photos) {
        const user = {
            name: displayName,
            email: emails[0].value,
            profile_picture: photos[0].value,
        };
        cb(null, user);
    }
}));
