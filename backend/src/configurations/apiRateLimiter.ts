import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    statusCode: httpStatus.TOO_MANY_REQUESTS,
    success: false,
    message: "Too many requests, please try again later.",
    data: null,
  },
  headers: true,
});
