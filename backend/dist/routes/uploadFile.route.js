"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadRoutes = void 0;
const cloudinary_1 = require("@/configurations/cloudinary");
const uploadFile_controller_1 = require("@/controllers/uploadFile.controller");
const auth_1 = __importDefault(require("@/middlewares/auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/single-image", auth_1.default, cloudinary_1.uploadFileMiddleware.singleImage.single("image"), uploadFile_controller_1.UploadFileController.uploadSingleImage);
router.post("/multiple-image", auth_1.default, cloudinary_1.uploadFileMiddleware.multipleImage.array("images"), uploadFile_controller_1.UploadFileController.uploadMultipleImage);
router.post("/single-file", auth_1.default, cloudinary_1.uploadFileMiddleware.singleImage.single("file"), uploadFile_controller_1.UploadFileController.uploadSingleFile);
router.post("/multiple-files", auth_1.default, cloudinary_1.uploadFileMiddleware.multipleImage.array("files"), uploadFile_controller_1.UploadFileController.uploadMultipleFile);
exports.FileUploadRoutes = router;
