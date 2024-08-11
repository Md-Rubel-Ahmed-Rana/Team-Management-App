import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { config } from "./envConfig";

export const initiatePassportSession = (app: Application) => {
  app.use(
    session({
      secret: config.google.clientSecret,
      resave: true,
      saveUninitialized: true,
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
