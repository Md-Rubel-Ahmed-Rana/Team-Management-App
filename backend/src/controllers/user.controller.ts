import { deleteSingleFileFromCloudinary } from "@/utils/deletePreviousFileFromCloudinary";
import { UserService } from "@/services/user.service";
import RootController from "@/shared/rootController";
import extractCloudinaryPublicId from "@/utils/getCloudinaryFilePublicIdFromUrl";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  getAllUsers = this.catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched  successfully",
      data: result,
    });
  });

  register = this.catchAsync(async (req: Request, res: Response) => {
    await UserService.register(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Registered successfully",
      data: null,
    });
  });

  updateUser = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (req.link) {
      const user = await UserService.findUserById(id);
      const profile_picture = user?.profile_picture;
      if (profile_picture) {
        const public_id = extractCloudinaryPublicId(profile_picture);
        await deleteSingleFileFromCloudinary(public_id);
      }
    }
    const data = req.link
      ? { ...req.body, profile_picture: req.link }
      : req.body;
    const result = await UserService.updateUser(id, data);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: result,
    });
  });

  forgetPassword = this.catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result: any = await UserService.forgetPassword(email);
    if (!result?.user) {
      this.apiResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "User not found",
        data: null,
      });
    } else if (result?.messageId) {
      this.apiResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:
          "Reset password link was send to your mail. Please check your inbox",
        data: null,
      });
    } else {
      this.apiResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Something went wrong to send reset email",
        data: null,
      });
    }
  });

  resetPassword = this.catchAsync(async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    await UserService.resetPassword(userId, password);
    this.apiResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Your password was changed",
      data: null,
    });
  });

  changePassword = this.catchAsync(async (req: Request, res: Response) => {
    const { userId, oldPassword, newPassword } = req.body;
    const result = await UserService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    if (!result) {
      this.apiResponse(res, {
        success: false,
        statusCode: httpStatus.OK,
        message: "Your old password was not correct",
        data: null,
      });
    } else {
      this.apiResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your password was changed",
        data: null,
      });
    }
  });
}

export const UserController = new Controller();
