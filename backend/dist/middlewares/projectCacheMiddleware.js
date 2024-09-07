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
const projectCacheMiddleware = {
    all: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // await CacheServiceInstance.project.deleteAllProjectFromCache();
            const projectsFromCache = yield cache_service_1.CacheServiceInstance.project.getAllProjectsFromCache();
            if (projectsFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Projects Fetched From Cache",
                    data: projectsFromCache,
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
            const projectFromCache = yield cache_service_1.CacheServiceInstance.project.getSingleProjectFromCache(id);
            if (projectFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Project Fetched From Cache",
                    data: projectFromCache,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
    myProjects: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            const myProjectFromCache = yield cache_service_1.CacheServiceInstance.project.getMyProjectsFromCache(userId);
            if (myProjectFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "My Projects Fetched From Cache",
                    data: myProjectFromCache,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
    assignedProjects: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const memberId = req.params.memberId;
            const myProjectFromCache = yield cache_service_1.CacheServiceInstance.project.getAssignedProjectsFromCache(memberId);
            if (myProjectFromCache) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Assigned Projects Fetched From Cache",
                    data: myProjectFromCache,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = projectCacheMiddleware;
