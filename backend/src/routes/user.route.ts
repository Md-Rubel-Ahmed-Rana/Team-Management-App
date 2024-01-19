import { Router } from "express";

import validateRequest from "../middlewares/validateRequest";

import { UserController } from "../controllers/user.controller";
import { UserValidationSchema } from "../validation/user.validation";
import verifyJwt from "../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidationSchema.registerZodSchema),
  UserController.register
);
router.get("/", UserController.getAllUsers);

router.get("/auth", verifyJwt, UserController.auth);

router.get("/all", UserController.getUsers);

router.post(
  "/login",
  validateRequest(UserValidationSchema.loginZodSchema),
  UserController.login
);

export const UserRouter = router;
