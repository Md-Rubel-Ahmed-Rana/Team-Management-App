import multer from "multer";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { Request, Response, NextFunction } from "express";
import makeUrlFromFileObject from "@/utils/makeUrlFromFileObject";
import { config } from "@/configurations/envConfig";

const upload = multer({ dest: "uploads/" });

const uploadSingleFile = (folderName: string) => {
  const folder = folderName ? `team-manager/${folderName}` : "team-manager";
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      delete req.body.file;
      return next();
    }

    try {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      const response = await axios.post(
        `${config.cloudinary.cloudinaryApi}/upload/single?folderName=${folder}`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      const extension = req.file?.originalname?.split(".").pop();
      const dataUrl = makeUrlFromFileObject({
        ...response.data.data,
        extension,
      });

      req.link = dataUrl;
      next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    } finally {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete uploaded file:", err);
      });
    }
  };
};

const uploadMultipleFiles = (folderName: string) => {
  const folder = folderName ? `team-manager/${folderName}` : "team-manager";
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files)) {
      delete req.body.files;
      return next();
    }

    try {
      const uploadResponses = await Promise.all(
        req.files.map(async (file: Express.Multer.File) => {
          const formData = new FormData();
          formData.append("file", fs.createReadStream(file.path));

          const response = await axios.post(
            `${config.cloudinary.cloudinaryApi}/upload/single?folderName=${folder}`,
            formData,
            {
              headers: {
                ...formData.getHeaders(),
              },
            }
          );

          // Clean up the uploaded file from the server
          fs.unlink(file.path, (err) => {
            if (err) console.error("Failed to delete uploaded file:", err);
          });
          const extension = file?.originalname?.split(".").pop();
          const dataUrl = makeUrlFromFileObject({
            ...response.data.data,
            extension,
          });

          return dataUrl;
        })
      );

      req.links = uploadResponses;
      next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
};

export { upload, uploadSingleFile, uploadMultipleFiles };
