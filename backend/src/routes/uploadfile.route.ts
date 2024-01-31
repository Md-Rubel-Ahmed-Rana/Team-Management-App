import { Router } from "express";
import { uploadFileMiddleware } from "../config/cloudinary";
import { UploadFileController } from "../controllers/uploadFile.controller";
import verifyJwt from "../middlewares/auth";

const router = Router();

router.post(
  "/single-image",
  verifyJwt,
  uploadFileMiddleware.singleImage.single("image"),
  UploadFileController.uploadSingleImage
);

router.post(
  "/multiple-image",
  verifyJwt,
  uploadFileMiddleware.multipleImage.array("images"),
  UploadFileController.uploadMultipleImage
);

router.post(
  "/single-file",
  verifyJwt,
  uploadFileMiddleware.singleImage.single("file"),
  UploadFileController.uploadSingleFile
);

router.post(
  "/multiple-files",
  verifyJwt,
  uploadFileMiddleware.multipleImage.array("files"),
  UploadFileController.uploadMultipleFile
);

export const FileUploadRoutes = router;
