import passport from "passport";
import googleOAuth from "passport-google-oauth20";
import facebookOAuth from "passport-facebook";
import githubOAuth from "passport-github";
import twitterOAuth from "passport-twitter";
import { StrategyConfigs } from "@/utils/oAuth";
import { generateEmailFromCredentials } from "@/utils/generateEmailFromCredentials";
import { config } from "./envConfig";

const GoogleStrategy = googleOAuth.Strategy;
const FacebookStrategy = facebookOAuth.Strategy;
const GitHubStrategy = githubOAuth.Strategy;
const TwitterStrategy = twitterOAuth.Strategy;

const { google, facebook, twitter, github } = StrategyConfigs;

console.log({ google, facebook, twitter, github });

// Configure google strategy
passport.use(
  new GoogleStrategy(google, (accessToken, refreshToken, profile, done) => {
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
    } catch (error) {
      console.log("Failed to login with Google", error);
      done(error, undefined);
    }
  })
);

// Configure Facebook strategy
passport.use(
  new FacebookStrategy(facebook, (accessToken, refreshToken, profile, done) => {
    try {
      const { displayName, id } = profile;
      const email = generateEmailFromCredentials(displayName, id);
      console.log(displayName, email);
      done(null, { name: displayName, email });
    } catch (error) {
      console.log("Failed to login with Facebook", error);
      done(error, undefined);
    }
  })
);

// Configure twitter strategy
passport.use(
  new TwitterStrategy(twitter, (accessToken, refreshToken, profile, done) => {
    try {
      const profile_picture = profile.photos && profile.photos[0].value;
      const displayName = profile.displayName;
      const email = generateEmailFromCredentials(displayName, profile.id);
      console.log(displayName, email, profile_picture);
      done(null, { name: displayName, email, profile_picture });
    } catch (error) {
      console.log("Failed to login with Twitter", error);
      done(error, undefined);
    }
  })
);

// Configure GitHub strategy
passport.use(
  new GitHubStrategy(
    github,
    async (accessToken, refreshToken, profile, done) => {
      try {
        const emails = await fetch(config.github.api, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }).then((res) => res.json());

        const email = emails[0]?.email;
        const { displayName } = profile;
        console.log(displayName, email);

        done(null, { email, name: displayName });
      } catch (error) {
        console.log("Failed to login with Github", error);
        done(error, undefined);
      }
    }
  )
);
