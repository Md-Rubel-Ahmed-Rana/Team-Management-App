"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_service_1 = require("@/services/cache.service");
const http_status_1 = __importDefault(require("http-status"));
const userCacheMiddleware = {
    all: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersFromCache = yield cache_service_1.CacheServiceInstance.user.getAllUsersFromCache();
            if (usersFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Users fetched successfully from cache",
                    data: usersFromCache,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
    single: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const userFromCache = yield cache_service_1.CacheServiceInstance.user.getSingleUserFromCache(id);
            if (userFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "User fetched successfully from cache",
                    data: userFromCache,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = userCacheMiddleware;
