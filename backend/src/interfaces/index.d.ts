/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null | any;
      files: any;
      id: any;
      email: string;
      role: string;
    }
  }
}
