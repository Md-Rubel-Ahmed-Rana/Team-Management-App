import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import { config } from "@/configurations/envConfig";

class Service {
  async login(data: Partial<IUser>): Promise<string> {
    // check user existence
    const isExist = await User.findOne({ email: data.email });
    const jwtPayload: { id: Types.ObjectId | string; email: string } = {
      id: "",
      email: "",
    };
    if (isExist) {
      jwtPayload.id = isExist._id;
      jwtPayload.email = isExist.email;
      const accessToken = jwt.sign(jwtPayload, config.jwt.accessTokenSecret, {
        expiresIn: config.jwt.accessTokenExpired,
      });
      return accessToken;
    } else {
      const result = await User.create(data);
      jwtPayload.id = result._id;
      jwtPayload.email = result.email;
      const accessToken = jwt.sign(jwtPayload, config.jwt.accessTokenSecret, {
        expiresIn: config.jwt.accessTokenExpired,
      });
      return accessToken;
    }
  }
}

export const GoogleOAuthService = new Service();
