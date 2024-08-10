import { IUser } from "@/interfaces/user.interface";
import { IJwtPayload } from "@/interfaces/util";
import User from "@/models/user.model";
import { JwtInstance } from "lib/jwt";
import { UserService } from "./user.service";
import ApiError from "@/shared/apiError";
import { HttpStatusInstance } from "lib/httpStatus";
import { BcryptInstance } from "lib/bcrypt";

class Service {
  async checkUserExistence(
    data: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const isExist = await UserService.findUserByEmail(data?.email);
    const jwtPayload: IJwtPayload = {
      id: "",
      email: "",
    };
    if (isExist) {
      jwtPayload.id = isExist.id;
      jwtPayload.email = isExist.email;
      const accessToken = await JwtInstance.generateAccessToken(jwtPayload);
      const refreshToken = await JwtInstance.generateRefreshToken(jwtPayload);
      return { accessToken, refreshToken };
    } else {
      const result = await User.create(data);
      jwtPayload.id = result._id;
      jwtPayload.email = result.email;
      const accessToken = await JwtInstance.generateAccessToken(jwtPayload);
      const refreshToken = await JwtInstance.generateRefreshToken(jwtPayload);
      return { accessToken, refreshToken };
    }
  }
  async auth(id: string) {
    const user = await UserService.findUserById(id);
    return user;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const isExist = await User.findOne({
      email,
    });
    if (!isExist) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found!");
    }

    const isMatchedPassword = await BcryptInstance.compare(
      password,
      isExist.password
    );
    if (!isMatchedPassword) {
      throw new ApiError(401, "Password doesn't match");
    }

    const jwtPayload = {
      id: isExist._id,
      email: isExist.email,
    };

    const accessToken = await JwtInstance.generateAccessToken(jwtPayload);
    const refreshToken = await JwtInstance.generateRefreshToken(jwtPayload);

    return { accessToken, refreshToken };
  }
  async googleLogin(
    data: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async facebookLogin(
    data: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async githubLogin(
    data: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
  async twitterLogin(
    data: IUser
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.checkUserExistence(data);
    return tokens;
  }
}

export const AuthService = new Service();
