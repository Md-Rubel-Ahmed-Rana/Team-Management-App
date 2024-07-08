import { UserController } from "@/controllers/user.controller";
import verifyJwt from "@/middlewares/auth";
import validateRequest from "@/middlewares/validateRequest";
import { UserValidationSchema } from "@/validations/user.validation";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidationSchema.registerZodSchema),
  UserController.register
);

router.get("/", UserController.getAllUsers);

router.get("/auth", verifyJwt, UserController.auth);

router.patch(
  "/update/:id",
  validateRequest(UserValidationSchema.updateZodSchema),
  UserController.updateUser
);

router.post(
  "/login",
  validateRequest(UserValidationSchema.loginZodSchema),
  UserController.login
);

router.delete("/logout", UserController.logout);

router.post("/forget-password", UserController.forgetPassword);

router.post("/reset-password", UserController.resetPassword);

router.post("/change-password", UserController.changePassword);

export const UserRoutes = router;
