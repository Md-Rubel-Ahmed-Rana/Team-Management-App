import { config } from "@/configurations/envConfig";
import { UserService } from "@/services/user.service";
import RootController from "@/shared/rootController";
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

  auth = this.catchAsync(async (req: Request, res: Response) => {
    const id: any = req?.id;
    const result = await UserService.auth(id);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User fetched  successfully",
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
    const result = await UserService.updateUser(id, req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: result,
    });
  });

  login = this.catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    res.cookie("tmAccessToken", result, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
      data: null,
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

  logout = this.catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("tmAccessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Logout successful",
      data: null,
    });
  });
}

export const UserController = new Controller();
