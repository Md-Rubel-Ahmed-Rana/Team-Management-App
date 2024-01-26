import dotenv from "dotenv";
dotenv.config();

export const config = {
  db: {
    url: process.env.DATABASE_URL as string,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackUrl:  process.env.GOOGLE_CALLBACK_URL as string
  },
  app: {
    port: process.env.PORT,
    environment: process.env.NODE_ENV as string,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    accessTokenExpired: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    publicKey: process.env.STRIPE_PUBLISH_KEY as string,
    successUrl: process.env.SUCCESS_URL as string,
    cancelUrl: process.env.CANCEL_URL as string,
  },
};
