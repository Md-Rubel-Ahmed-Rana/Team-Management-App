import { IGetUser, IUser } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import ApiError from "@/shared/apiError";
import { config } from "@/configurations/envConfig";
import { MailUtilService } from "@/utils/mail.util";
import { BcryptInstance } from "lib/bcrypt";
import { JwtInstance } from "lib/jwt";
import { HttpStatusInstance } from "lib/httpStatus";
import { UserSelect } from "propertySelections";
import { Types } from "mongoose";
import { IChatFriend, ILastMessage } from "@/interfaces/message.interface";
import { CacheServiceInstance } from "./cache.service";
import { MessageService } from "./message.service";

class Service {
  // Temporarily using as alternative of DTO
  public userSanitizer(user: any): IGetUser {
    return {
      id: String(user?._id),
      name: user?.name,
      email: user?.email,
      department: user?.department || "",
      designation: user?.designation || "",
      phoneNumber: user?.phoneNumber || "",
      profile_picture: user?.profile_picture || "",
      presentAddress: user?.presentAddress || "",
      permanentAddress: user?.permanentAddress || "",
      country: user?.country || "",
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }

  async getAllUsers(): Promise<IGetUser[]> {
    const result = await User.find({}).select(UserSelect);
    const dtoUsers = result.map((user: any) => this.userSanitizer(user));
    await CacheServiceInstance.user.setAllUsersToCache(dtoUsers);
    return dtoUsers;
  }

  async myChatFriends(userId: string): Promise<IChatFriend[]> {
    try {
      const objectId = Types.ObjectId.isValid(userId)
        ? new Types.ObjectId(userId)
        : null;

      if (!objectId) {
        throw new Error("Invalid userId format");
      }

      const distinctUserIds = await MessageService.getDistinctUserIds(
        objectId,
        userId
      );

      if (!distinctUserIds?.length) {
        return [];
      }

      const userIds = distinctUserIds
        ?.map((entry) => {
          return Types.ObjectId.isValid(entry?.userId)
            ? new Types.ObjectId(entry?.userId)
            : null;
        })
        ?.filter((id) => id !== null);

      // Fetch users corresponding to these user IDs
      const usersData = await User.find({ _id: { $in: userIds } });
      const dtoUsers = usersData?.map((user) => this.userSanitizer(user));

      // Fetch the latest message and include it in the response
      const userDetailsWithLastMessage = await Promise.all(
        dtoUsers.map(async (user) => {
          const lastMessageDoc: any = await MessageService.getLastMessage(
            objectId,
            userId,
            user
          );

          const lastMessage: ILastMessage = {
            text: lastMessageDoc?.text,
            files: lastMessageDoc?.files,
            images: lastMessageDoc?.images,
            createdAt: lastMessageDoc?.createdAt,
          };

          const friend: IChatFriend = {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            profile_picture: user?.profile_picture,
            lastMessage,
          };
          return friend;
        })
      );

      // Sort users based on the creation date of the most recent message
      userDetailsWithLastMessage.sort((a, b) => {
        const dateA = a.lastMessage?.createdAt || new Date(0);
        const dateB = b.lastMessage?.createdAt || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      return userDetailsWithLastMessage.filter((user) => user.id !== userId);
    } catch (error) {
      console.error("Error fetching chat friends:", error);
      throw new Error("Failed to fetch chat friends.");
    }
  }

  async register(user: IUser): Promise<any> {
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

    const newUser = await User.create(user);
    const dtoUser = this.userSanitizer(newUser);
    await CacheServiceInstance.user.addNewUserToCache(dtoUser);
    return newUser;
  }

  async findUserById(id: string): Promise<IGetUser> {
    const user = await User.findById(id).select(UserSelect);
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
    }

    return this.userSanitizer(user);
  }

  async findUserByEmail(email: string): Promise<IGetUser> {
    const user = await User.findOne({ email: email }).select(UserSelect);
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
    }
    return this.userSanitizer(user);
  }
  async findUserByEmailWithPassword(email: string): Promise<any> {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new ApiError(HttpStatusInstance.NOT_FOUND, "User not found");
    }
    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<void> {
    const result: any = await User.findByIdAndUpdate(
      id,
      { $set: { ...data } },
      { new: true }
    ).select(UserSelect);
    const dtoUser = this.userSanitizer(result);
    await CacheServiceInstance.user.updateUserInCache(dtoUser);
  }

  async forgetPassword(email: string): Promise<any> {
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

  async resetPassword(userId: string, password: string): Promise<any> {
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
