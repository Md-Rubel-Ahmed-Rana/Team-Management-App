import { IUser } from "@/interfaces/user.interface";
import { IJwtPayload } from "@/interfaces/util";
import User from "@/models/user.model";
import { JwtInstance } from "lib/jwt";

class Service {
  async checkUserExistence(
    data: Partial<IUser>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const isExist = await User.findOne({ email: data.email });
    const jwtPayload: IJwtPayload = {
      id: "",
      email: "",
    };
    if (isExist) {
      jwtPayload.id = isExist._id;
      jwtPayload.email = isExist.email;
      const accessToken = await JwtInstance.accessToken(jwtPayload);
      const refreshToken = await JwtInstance.refreshToken(jwtPayload);
      return { accessToken, refreshToken };
    } else {
      const result = await User.create(data);
      jwtPayload.id = result._id;
      jwtPayload.email = result.email;
      const accessToken = await JwtInstance.accessToken(jwtPayload);
      const refreshToken = await JwtInstance.refreshToken(jwtPayload);
      return { accessToken, refreshToken };
    }
  }
  async googleLogin(
    data: Partial<IUser>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async facebookLogin(
    data: Partial<IUser>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async githubLogin(
    data: Partial<IUser>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async twitterLogin(
    data: Partial<IUser>
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
}

export const AuthService = new Service();
