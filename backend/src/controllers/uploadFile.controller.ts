import { Request, Response } from "express";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  uploadSingleImage = this.catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Image not uploaded",
        data: null,
      });
    } else {
      const imageUrl = req.file.path;
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Image uploaded successfully!",
        data: imageUrl,
      });
    }
  });

  uploadMultipleImage = this.catchAsync(async (req: Request, res: Response) => {
    if (!req.files || req.files.length === 0) {
      this.apiResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Images not uploaded!",
        data: null,
      });
    } else {
      const imageUrls = (req.files as Express.Multer.File[]).map(
        (file: Express.Multer.File) => file.path
      );
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Images uploaded successfully!",
        data: imageUrls,
      });
    }
  });

  uploadSingleFile = this.catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      this.apiResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "File not uploaded!",
        data: null,
      });
    } else {
      const imageUrl = req.file.path;
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "File uploaded successfully!",
        data: imageUrl,
      });
    }
  });

  uploadMultipleFile = this.catchAsync(async (req: Request, res: Response) => {
    if (!req.files || req.files.length === 0) {
      this.apiResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Files not uploaded!",
        data: null,
      });
    } else {
      const fileUrls = (req.files as Express.Multer.File[]).map(
        (file: Express.Multer.File) => file.path
      );
      this.apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Files uploaded successfully!",
        data: fileUrls,
      });
    }
  });
}

export const UploadFileController = new Controller();
