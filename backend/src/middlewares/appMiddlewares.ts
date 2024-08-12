import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { apiLimiter } from "@/configurations/apiRateLimiter";
import { corsConfig } from "@/configurations/cors";

const appMiddlewares = (app: Application) => {
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(apiLimiter);
};

export default appMiddlewares;
