import { Application } from "express";
import session from "express-session";
import passport from "passport";
import RedisStore from "connect-redis";
import { config } from "./envConfig";
import Redis from "ioredis";

// Create a new Redis client
const redisClient = new Redis({
  host: config.redis.host,
  port: Number(config.redis.port),
  password: config.redis.password,
});

export const initiatePassportSession = (app: Application) => {
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: config.google.clientSecret,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize user into the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from the session
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
};
