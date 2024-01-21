import jwt from "jsonwebtoken";
import ApiError from "../error/apiError";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  const result = await User.find({}).select({
    name: 1,
    email: 1,
    department: 1,
    designation: 1,
    profile_picture: 1,
  });
  return result;
};

const getUsers = async () => {
  const result = await User.find({});
  return result;
};

const register = async (user: any) => {
  const isExist = await User.findOne({
    email: user?.email,
  });
  if (isExist) {
    return {
      success: false,
      message: "User already exists!",
      error: `This email (${user.email}) is already used`,
      data: null,
    };
  }

  const hashedPassword = await bcrypt.hash(user?.password, 12);
  user.password = hashedPassword;

  await User.create(user);
  return {
    success: true,
    message: "User register successful",
    error: null,
    data: null,
  };
};

const auth = async (id: string) => {
  const isExist: any = await User.findById(id);
  if (!isExist) {
    return {
      success: false,
      message: "User does not exist",
      error: "Your requested user is not found",
      data: null,
    };
  }

  const { _id, name, profile_picture, email, department, designation } =
    isExist;

  return {
    success: true,
    message: "User found",
    error: null,
    data: { _id, name, profile_picture, email, department, designation },
  };
};

const login = async (email: string, password: string) => {
  const isExist = await User.findOne({
    email,
  });
  if (!isExist) {
    throw new ApiError(404, "User not found!");
  }

  const isMatchedPassword = await bcrypt.compare(password, isExist.password);
  if (!isMatchedPassword) {
    throw new ApiError(401, "Password doesn't match");
  }

  const jwtPayload = {
    id: isExist._id,
    email: isExist.email,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_EXPIRES_IN as string,
    }
  );

  return accessToken;
};

export const UserService = {
  login,
  register,
  getAllUsers,
  getUsers,
  auth,
};
