/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null | any;
      files: {
        images: Express.Multer.File[] | string[];
        files: Express.Multer.File[] | string[];
      };
      id: any;
      email: string;
      role: string;
      link: string;
      links: string[];
    }
  }
}
