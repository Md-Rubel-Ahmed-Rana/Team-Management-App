import { config } from "@/configurations/envConfig";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class JWT {
  async accessToken(payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> {
    const token = await jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpired,
    });
    return token;
  }
  async refreshToken(payload: {
    id: Types.ObjectId | string;
    email: string;
  }): Promise<string> {
    const token = await jwt.sign(payload, config.jwt.refreshTokenSecret, {
      expiresIn: config.jwt.refreshTokenExpired,
    });
    return token;
  }
}

export const JwtInstance = new JWT();
