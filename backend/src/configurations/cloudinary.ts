import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "./envConfig";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinarySecretKey,
  secure: true,
});

const singleImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
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
  },
});

const multipleImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
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
  },
});

const multipleFileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
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
  },
});

const singleFileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
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
  },
});

const singleImage = multer({ storage: singleImageStorage });
const multipleImage = multer({ storage: multipleImageStorage });
const uploadSingleFile = multer({ storage: singleFileStorage });
const uploadMultipleFile = multer({ storage: multipleFileStorage });

export const uploadFileMiddleware = {
  singleImage,
  multipleImage,
  uploadSingleFile,
  uploadMultipleFile,
};
