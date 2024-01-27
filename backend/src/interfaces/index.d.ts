/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null | any;
      files: any;
      id: string;
      email: string;
      role: string;
    }
  }
}
