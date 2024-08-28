import { IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import ApiError from "@/shared/apiError";
import { config } from "@/configurations/envConfig";
import { MailUtilService } from "@/utils/mail.util";
import { BcryptInstance } from "lib/bcrypt";
import { JwtInstance } from "lib/jwt";
import { HttpStatusInstance } from "lib/httpStatus";
import { UserSelect } from "propertySelections";

class Service {
  async getAllUsers(): Promise<any> {
    const result = await User.find({}).select(UserSelect);
    return result;
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

  async findUserById(id: string): Promise<any> {
    const user = await User.findById(id).select(UserSelect);
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<any> {
    const user = await User.findOne({ email: email }).select(UserSelect);
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
    }

    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<any> {
    const result = await User.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    ).select(UserSelect);

    return result;
  }

  async forgetPassword(email: string) {
    const isUserExist = await User.findOne({ email: email }).select(UserSelect);

    if (!isUserExist) {
      return false;
    } else {
      const jwtPayload = {
        id: isUserExist._id,
        email: isUserExist.email,
      };
      const token = await JwtInstance.generateAccessToken(jwtPayload);
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
  ): Promise<boolean> {
    const user = await User.findById(userId).select(UserSelect);
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
      }).select(UserSelect);
      return true;
    }
  }
}

export const UserService = new Service();
