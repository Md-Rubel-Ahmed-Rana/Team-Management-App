import { redisKeys } from "@/constants/redisKeys";
import { UserController } from "@/controllers/user.controller";
import verifyJwt from "@/middlewares/auth";
import { RedisCacheService } from "@/middlewares/redisCache";
import validateRequest from "@/middlewares/validateRequest";
import { UserValidationSchema } from "@/validations/user.validation";
import { Router } from "express";

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
