import multer from "multer";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { Request, Response, NextFunction } from "express";
import makeUrlFromFileObject from "@/utils/makeUrlFromFileObject";
import { config } from "@/configurations/envConfig";

const upload = multer({ dest: "uploads/" });
const rootFolder = "team-manager";

const uploadSingleFile = (folderName: string) => {
  const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
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
  const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files)) {
      delete req.body.files;
      return next();
    }

    try {
      const uploadResponses = await Promise.all(
        req.files.map(async (file: any) => {
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

const uploadMessageImageAndFiles = (folderName: string) => {
  const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
  return async (req: Request, res: Response, next: NextFunction) => {
    const images = (req.files?.images as Express.Multer.File[]) || [];
    const files = (req.files?.files as Express.Multer.File[]) || [];
    let uploadedFiles: string[] = [];
    let uploadedImages: string[] = [];
    try {
      if (files.length > 0) {
        uploadedFiles = await handleUpload(files, `${folder}/files`);
      }
      if (images.length > 0) {
        uploadedImages = await handleUpload(images, `${folder}/images`);
      }

      req.body.images = uploadedImages;
      req.body.files = uploadedFiles;
    } catch (error: any) {
      console.error("Error uploading files or images:", error);
    } finally {
      next();
    }
  };
};

const handleUpload = async (
  files: Express.Multer.File[],
  folder: string
): Promise<string[]> => {
  const uploadedFiles: string[] = [];
  const formData = new FormData();

  files.forEach((file: any) => {
    formData.append("files", fs.createReadStream(file.path));
  });

  try {
    const response = await axios.post(
      `${config.cloudinary.cloudinaryApi}/upload/many?folderName=${folder}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    response?.data?.data.forEach((obj: any, index: number) => {
      const extension = files[index]?.originalname?.split(".").pop();
      const dataUrl = makeUrlFromFileObject({
        ...obj,
        extension: extension,
      });
      uploadedFiles.push(dataUrl);
    });
  } catch (error) {
    console.error("Failed to upload files:", error);
  } finally {
    files.forEach((file: any) => {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Failed to delete uploaded file:", err);
      });
    });
  }

  return uploadedFiles;
};

export {
  upload,
  uploadSingleFile,
  uploadMultipleFiles,
  uploadMessageImageAndFiles,
};
