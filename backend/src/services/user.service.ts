import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import { RedisCacheService } from "@/middlewares/redisCache";
import { redisKeys } from "@/constants/redisKeys";
import ApiError from "@/shared/apiError";
import { config } from "@/configurations/envConfig";

class Service {
  async getAllUsers(): Promise<IUser[]> {
    const result = await User.find({}).select({
      name: 1,
      email: 1,
      department: 1,
      designation: 1,
      profile_picture: 1,
    });
    await RedisCacheService.insertMany(redisKeys.users, result);
    return result;
  }

  async getUsers(): Promise<IUser[]> {
    const result = await User.find({});
    return result;
  }

  async register(user: IUser): Promise<void> {
    const isExist = await User.findOne({
      email: user?.email,
    });
    if (isExist) {
      throw new ApiError(httpStatus.CONFLICT, "This email already exist");
    }

    const hashedPassword = await bcrypt.hash(user?.password, 12);
    user.password = hashedPassword;

    const result = await User.create(user);
    const data = {
      _id: result?._id,
      name: result?.name,
      profile_picture: result?.profile_picture,
      email: result?.email,
      department: result?.department,
      designation: result?.designation,
    };
    await RedisCacheService.insertOne(redisKeys.users, data);
  }

  async auth(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const result = await User.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    );
    return result;
  }

  async login(email: string, password: string): Promise<string> {
    const isExist = await User.findOne({
      email,
    });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }

    const isMatchedPassword = await bcrypt.compare(password, isExist.password);
    if (!isMatchedPassword) {
      throw new ApiError(401, "Password doesn't match");
    }

    const jwtPayload = {
      id: isExist._id,
      email: isExist.email,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpired,
    });

    return accessToken;
  }
}

export const UserService = new Service();
