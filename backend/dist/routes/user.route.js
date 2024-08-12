"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("@/controllers/user.controller");
const cloudinary_1 = require("@/middlewares/cloudinary");
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const user_validation_1 = require("@/validations/user.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.registerZodSchema), user_controller_1.UserController.register);
router.get("/", user_controller_1.UserController.getAllUsers);
router.patch("/update/:id", cloudinary_1.upload.single("file"), (0, cloudinary_1.uploadSingleFile)("profiles"), (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.updateZodSchema), user_controller_1.UserController.updateUser);
router.post("/forget-password", user_controller_1.UserController.forgetPassword);
router.post("/reset-password", user_controller_1.UserController.resetPassword);
router.post("/change-password", user_controller_1.UserController.changePassword);
exports.UserRoutes = router;
