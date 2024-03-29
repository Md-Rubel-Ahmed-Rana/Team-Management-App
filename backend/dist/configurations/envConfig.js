"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    db: {
        url: process.env.DATABASE_URL,
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_CALLBACK_URL,
        redirectUrl: process.env.GOOGLE_REDIRECT_URL,
        appUser: process.env.GOOGLE_APP_USER,
        appPass: process.env.GOOGLE_APP_PASSWORD,
    },
    app: {
        port: process.env.PORT || 5000,
        environment: process.env.NODE_ENV,
        frontendDomain: process.env.FRONTEND_DOMAIN,
    },
    redis: {
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    cloudinary: {
        cloudinaryName: process.env.CLOUDINARY_API_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinarySecretKey: process.env.CLOUDINARY_API_SECRET,
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        accessTokenExpired: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publicKey: process.env.STRIPE_PUBLISH_KEY,
        successUrl: process.env.SUCCESS_URL,
        cancelUrl: process.env.CANCEL_URL,
    },
};
