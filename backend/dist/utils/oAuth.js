"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyConfigs = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const google = {
    clientID: envConfig_1.config.google.clientId,
    clientSecret: envConfig_1.config.google.clientSecret,
    callbackURL: envConfig_1.config.google.callbackUrl,
    redirectUrl: envConfig_1.config.google.redirectUrl,
    scope: ["profile", "email"],
};
const facebook = {
    clientID: envConfig_1.config.facebook.appId,
    clientSecret: envConfig_1.config.facebook.appSecret,
    callbackURL: envConfig_1.config.facebook.callbackUrl,
    redirectUrl: envConfig_1.config.facebook.redirectUrl,
};
const twitter = {
    clientID: envConfig_1.config.twitter.clientId,
    clientSecret: envConfig_1.config.twitter.clientSecret,
    consumerKey: envConfig_1.config.twitter.consumerKey,
    consumerSecret: envConfig_1.config.twitter.consumerSecret,
    callbackURL: envConfig_1.config.twitter.callbackUrl,
    redirectUrl: envConfig_1.config.twitter.redirectUrl,
};
const github = {
    appId: envConfig_1.config.github.appId,
    clientID: envConfig_1.config.github.clientId,
    clientSecret: envConfig_1.config.github.clientSecret,
    callbackURL: envConfig_1.config.github.callbackUrl,
    redirectUrl: envConfig_1.config.github.redirectUrl,
    scope: ["user:email"],
};
exports.StrategyConfigs = {
    google,
    facebook,
    twitter,
    github,
};
