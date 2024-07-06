"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("@/controllers/user.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const validateRequest_1 = __importDefault(require("@/middlewares/validateRequest"));
const user_validation_1 = require("@/validations/user.validation");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.registerZodSchema), user_controller_1.UserController.register);
router.get("/", user_controller_1.UserController.getAllUsers);
router.get("/auth", auth_1.default, user_controller_1.UserController.auth);
router.patch("/update/:id", (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.updateZodSchema), user_controller_1.UserController.updateUser);
router.post("/login", (0, validateRequest_1.default)(user_validation_1.UserValidationSchema.loginZodSchema), user_controller_1.UserController.login);
router.delete("/logout", user_controller_1.UserController.logout);
exports.UserRoutes = router;
