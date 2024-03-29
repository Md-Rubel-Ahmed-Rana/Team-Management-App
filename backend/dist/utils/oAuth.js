"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyConfig = void 0;
const envConfig_1 = require("@/configurations/envConfig");
exports.strategyConfig = {
    clientID: envConfig_1.config.google.clientId,
    clientSecret: envConfig_1.config.google.clientSecret,
    callbackURL: envConfig_1.config.google.callbackUrl,
    scope: ["profile", "email"],
};
