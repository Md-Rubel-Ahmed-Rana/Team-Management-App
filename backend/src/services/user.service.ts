import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import ApiError from "@/shared/apiError";
import { config } from "@/configurations/envConfig";
import { mapper } from "../mapper";
import { UserEntity } from "@/entities/user.entity";
import { GetUserDTO } from "@/dto/user/get";
import { ModelIdentifier } from "@automapper/core";
import { UpdateUserDTO } from "@/dto/user/update";

class Service {
  async getAllUsers(): Promise<GetUserDTO[]> {
    const result = await User.find({});
    const mappedData = mapper.mapArray(
      result,
      UserEntity as ModelIdentifier,
      GetUserDTO
    );
    return mappedData;
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

    await User.create(user);
  }

  async auth(id: string): Promise<GetUserDTO | null> {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const mappedUser = mapper.map(
      user,
      UserEntity as ModelIdentifier,
      GetUserDTO
    );
    return mappedUser;
  }

  async updateUser(
    id: string,
    data: Partial<IUser>
  ): Promise<UpdateUserDTO | null> {
    const result = await User.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    );
    const mappedUser = mapper.map(
      result,
      UserEntity as ModelIdentifier,
      UpdateUserDTO
    );
    return mappedUser;
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
