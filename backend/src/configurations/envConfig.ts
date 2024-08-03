import dotenv from "dotenv";
dotenv.config();

export const config = {
  db: {
    url: process.env.DATABASE_URL as string,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL as string,
    appUser: process.env.GOOGLE_APP_USER as string,
    appPass: process.env.GOOGLE_APP_PASSWORD as string,
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID as string,
    appSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackUrl: process.env.FACEBOOK_CALLBACK_URL as string,
    redirectUrl: process.env.FACEBOOK_REDIRECT_URL as string,
  },
  github: {
    appId: process.env.GITHUB_APP_ID as string,
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackUrl: process.env.GITHUB_CALLBACK_URL as string,
    redirectUrl: process.env.GITHUB_REDIRECT_URL as string,
    api: process.env.GITHUB_API as string,
  },
  twitter: {
    clientId: process.env.TWITTER_CLIENT_ID as string,
    clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
    callbackUrl: process.env.TWITTER_CALLBACK_URL as string,
    redirectUrl: process.env.TWITTER_REDIRECT_URL as string,
  },
  app: {
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV as string,
    frontendDomain: process.env.FRONTEND_DOMAIN as string,
  },
  redis: {
    password: process.env.REDIS_PASSWORD as string,
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as string,
  },
  cloudinary: {
    cloudinaryName: process.env.CLOUDINARY_API_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecretKey: process.env.CLOUDINARY_API_SECRET,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    accessTokenExpired: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    refreshTokenExpired: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    publicKey: process.env.STRIPE_PUBLISH_KEY as string,
    successUrl: process.env.SUCCESS_URL as string,
    cancelUrl: process.env.CANCEL_URL as string,
  },
};
