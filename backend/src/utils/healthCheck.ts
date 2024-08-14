import { Application } from "express";
import httpStatus from "http-status";

const healthCheck = (app: Application) => {
  app.get("/", (req, res) => {
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Team Manager server is running",
      data: null,
    });
  });
};

export default healthCheck;
