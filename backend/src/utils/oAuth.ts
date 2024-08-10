import { config } from "@/configurations/envConfig";

const google = {
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
  redirectUrl: config.google.redirectUrl,
  scope: ["profile", "email"],
};

const facebook = {
  clientID: config.facebook.appId,
  clientSecret: config.facebook.appSecret,
  callbackURL: config.facebook.callbackUrl,
  redirectUrl: config.facebook.redirectUrl,
};

const twitter = {
  clientID: config.twitter.clientId,
  clientSecret: config.twitter.clientSecret,
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackUrl,
  redirectUrl: config.twitter.redirectUrl,
};

const github = {
  appId: config.github.appId,
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl,
  redirectUrl: config.github.redirectUrl,
  scope: ["user:email"],
};

export const StrategyConfigs = {
  google,
  facebook,
  twitter,
  github,
};
