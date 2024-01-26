import passport from "passport";

import googleOAuth from "passport-google-oauth20";
import { strategyConfig } from "../utils/oAuth";

const GoogleStrategy = googleOAuth.Strategy;

passport.use(new GoogleStrategy(strategyConfig, (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    const { displayName, emails, photos } = profile;
    if(displayName && emails && photos){
        const user = {
            name: displayName,
            email: emails[0].value,
            profile_picture: photos[0].value
        }
        cb(null, user);
    }
}));
