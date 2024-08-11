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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const passport_github_1 = __importDefault(require("passport-github"));
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const oAuth_1 = require("@/utils/oAuth");
const generateEmailFromCredentials_1 = require("@/utils/generateEmailFromCredentials");
const envConfig_1 = require("./envConfig");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const FacebookStrategy = passport_facebook_1.default.Strategy;
const GitHubStrategy = passport_github_1.default.Strategy;
const TwitterStrategy = passport_twitter_1.default.Strategy;
const { google, facebook, twitter, github } = oAuth_1.StrategyConfigs;
// Configure google strategy
passport_1.default.use(new GoogleStrategy(google, (accessToken, refreshToken, profile, done) => {
    try {
        const { displayName, emails, photos } = profile;
        if (displayName && emails && photos) {
            const user = {
                name: displayName,
                email: emails[0].value,
                profile_picture: photos[0].value,
            };
            done(null, user);
        }
    }
    catch (error) {
        console.log("Failed to login with Google", error);
        done(error, undefined);
    }
}));
// Configure Facebook strategy
passport_1.default.use(new FacebookStrategy(facebook, (accessToken, refreshToken, profile, done) => {
    try {
        const { displayName, id } = profile;
        const email = (0, generateEmailFromCredentials_1.generateEmailFromCredentials)(displayName, id);
        done(null, { name: displayName, email });
    }
    catch (error) {
        console.log("Failed to login with Facebook", error);
        done(error, undefined);
    }
}));
// Configure twitter strategy
passport_1.default.use(new TwitterStrategy(twitter, (accessToken, refreshToken, profile, done) => {
    try {
        const profile_picture = profile.photos && profile.photos[0].value;
        const displayName = profile.displayName;
        const email = (0, generateEmailFromCredentials_1.generateEmailFromCredentials)(displayName, profile.id);
        done(null, { name: displayName, email, profile_picture });
    }
    catch (error) {
        console.log("Failed to login with Twitter", error);
        done(error, undefined);
    }
}));
// Configure GitHub strategy
passport_1.default.use(new GitHubStrategy(github, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const emails = yield fetch(envConfig_1.config.github.api, {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        }).then((res) => res.json());
        const email = (_a = emails[0]) === null || _a === void 0 ? void 0 : _a.email;
        const { displayName } = profile;
        done(null, { email, name: displayName });
    }
    catch (error) {
        console.log("Failed to login with Github", error);
        done(error, undefined);
    }
})));
