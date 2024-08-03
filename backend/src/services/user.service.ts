import { IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import ApiError from "@/shared/apiError";
import { config } from "@/configurations/envConfig";
import { mapper } from "../mapper";
import { UserEntity } from "@/entities/user.entity";
import { GetUserDTO } from "@/dto/user/get";
import { ModelIdentifier } from "@automapper/core";
import { UpdateUserDTO } from "@/dto/user/update";
import { MailUtilService } from "@/utils/mail.util";
import { BcryptInstance } from "lib/bcrypt";
import { JwtInstance } from "lib/jwt";
import { HttpStatusInstance } from "lib/httpStatus";

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
      throw new ApiError(
        HttpStatusInstance.CONFLICT,
        "This email already exist"
      );
    }

    const hashedPassword = await BcryptInstance.hash(user.password);
    user.password = hashedPassword;

    await User.create(user);
  }

  async auth(id: string): Promise<GetUserDTO | null> {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
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

    const accessToken = await JwtInstance.accessToken(jwtPayload);

    return accessToken;
  }

  async forgetPassword(email: string) {
    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      return false;
    } else {
      const jwtPayload = {
        id: isUserExist._id,
        email: isUserExist.email,
      };
      const token = await JwtInstance.accessToken(jwtPayload);
      const encodedEmail = encodeURIComponent(isUserExist.email);
      const encodedName = encodeURIComponent(isUserExist.name);
      const link = `${config.app.frontendDomain}/reset-password?token=${token}&userId=${isUserExist._id}&email=${encodedEmail}&name=${encodedName}`;
      const mailResult = await MailUtilService.sendResetPasswordLink(
        email,
        link
      );
      return { user: isUserExist, messageId: mailResult.messageId };
    }
  }

  async resetPassword(userId: string, password: string) {
    const hashedPassword = await BcryptInstance.hash(password);
    await User.findByIdAndUpdate(userId, {
      $set: { password: hashedPassword },
    });
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await User.findById(userId);
    const isPassMatch = await BcryptInstance.compare(
      oldPassword,
      user?.password as string
    );
    if (!isPassMatch) {
      return false;
    } else {
      const hashedPassword = await BcryptInstance.hash(newPassword);
      await User.findByIdAndUpdate(userId, {
        $set: { password: hashedPassword },
      });
      return true;
    }
  }
}

export const UserService = new Service();
