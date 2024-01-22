import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();

    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully fetched users",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getUsers();
    res.json({
      statusCode: 200,
      success: true,
      message: "Successfully fetched users",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.auth(req.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.register(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await UserService.updateUser(id, req.body);
    res.json({
      success: true,
      message: "User updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  register,
  login,
  getUsers,
  auth,
  updateUser,
};
