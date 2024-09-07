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
const teamCacheMiddleware = {
    all: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // await CacheServiceInstance.team.deleteAllTeamFromCache();
            const teams = yield cache_service_1.CacheServiceInstance.team.getAllTeamsFromCache();
            if (teams) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Teams Fetched From Cache",
                    data: teams,
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
            const team = yield cache_service_1.CacheServiceInstance.team.getSingleTeamFromCache(id);
            if (team) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Team Fetched From Cache",
                    data: team,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
    myTeams: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const adminId = req.params.adminId;
            const myTeams = yield cache_service_1.CacheServiceInstance.team.getMyTeamsFromCache(adminId);
            if (myTeams) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "My Teams Fetched From Cache",
                    data: myTeams,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
    joinedTeams: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const memberId = req.params.memberId;
            const teams = yield cache_service_1.CacheServiceInstance.team.joinedTeams(memberId);
            if (teams) {
                return res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Joined Projects Fetched From Cache",
                    data: teams,
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = teamCacheMiddleware;
