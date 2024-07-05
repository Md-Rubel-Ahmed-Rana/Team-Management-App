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
    res.cookie("tmAccessToken", result, { httpOnly: true, secure: true });
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
      data: null,
    });
  });
}

export const UserController = new Controller();
