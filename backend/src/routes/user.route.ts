import { Router } from "express";

import validateRequest from "../middlewares/validateRequest";

import { UserController } from "../controllers/user.controller";
import { UserValidationSchema } from "../validation/user.validation";
import verifyJwt from "../middlewares/auth";
import { RedisCacheService } from "../middlewares/redisCache";
import { redisKeys } from "../constants/redisKeys";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidationSchema.registerZodSchema),
  UserController.register
);

router.get(
  "/",
  RedisCacheService.findMany(redisKeys.users, "Users fetched from caches"),
  UserController.getAllUsers
);

router.get("/auth", verifyJwt, UserController.auth);

router.patch(
  "/update/:id",
  verifyJwt,
  validateRequest(UserValidationSchema.updateZodSchema),
  UserController.updateUser
);

router.get("/all", UserController.getUsers);

router.post(
  "/login",
  validateRequest(UserValidationSchema.loginZodSchema),
  UserController.login
);

export const UserRoutes = router;
