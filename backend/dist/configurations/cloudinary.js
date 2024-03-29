"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const envConfig_1 = require("./envConfig");
cloudinary_1.v2.config({
    cloud_name: envConfig_1.config.cloudinary.cloudinaryName,
    api_key: envConfig_1.config.cloudinary.cloudinaryApiKey,
    api_secret: envConfig_1.config.cloudinary.cloudinarySecretKey,
    secure: true,
});
const singleImageStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "team-management-app/images",
            allowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "tiff",
                "webp",
                "svg",
                "ico",
                "jfif",
            ],
        };
    }),
});
const multipleImageStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "team-management-app/images",
            allowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "tiff",
                "webp",
                "svg",
                "ico",
                "jfif",
            ],
        };
    }),
});
const multipleFileStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "team-management-app/files",
            allowedFormats: [
                "pdf",
                "mp4",
                "avi",
                "mov",
                "mkv",
                "wmv",
                "flv",
                "mpeg",
                "mpg",
                "webm",
                "3gp",
            ],
        };
    }),
});
const singleFileStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: "team-management-app/files",
            allowedFormats: [
                "pdf",
                "mp4",
                "avi",
                "mov",
                "mkv",
                "wmv",
                "flv",
                "mpeg",
                "mpg",
                "webm",
                "3gp",
            ],
        };
    }),
});
const singleImage = (0, multer_1.default)({ storage: singleImageStorage });
const multipleImage = (0, multer_1.default)({ storage: multipleImageStorage });
const uploadSingleFile = (0, multer_1.default)({ storage: singleFileStorage });
const uploadMultipleFile = (0, multer_1.default)({ storage: multipleFileStorage });
exports.uploadFileMiddleware = {
    singleImage,
    multipleImage,
    uploadSingleFile,
    uploadMultipleFile,
};
