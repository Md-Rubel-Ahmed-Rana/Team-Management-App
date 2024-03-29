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
exports.RedisCacheService = void 0;
const redis_1 = __importDefault(require("@/configurations/redis"));
const http_status_1 = __importDefault(require("http-status"));
class RedisCache {
    insertOne(key, data, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const prevData = yield this.getCachedData(key);
            if ((prevData === null || prevData === void 0 ? void 0 : prevData.length) > 0) {
                const newData = [...prevData, data];
                yield redis_1.default.set(key, JSON.stringify(newData), { EX: expireDate });
            }
            else {
                yield redis_1.default.set(key, JSON.stringify([data]), { EX: expireDate });
            }
        });
    }
    insertMany(key, data, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.set(key, JSON.stringify(data), { EX: expireDate });
        });
    }
    findMany(key, message) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getCachedData(key);
                if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
                    res.status(http_status_1.default.OK).json({
                        statusCode: http_status_1.default.OK,
                        success: true,
                        message: message,
                        data: data,
                    });
                }
                else {
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    findNotification() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const key = req.params.userId;
                let data = yield this.getCachedData(key);
                data = data.sort((a, b) => (b === null || b === void 0 ? void 0 : b.sortBy) - (a === null || a === void 0 ? void 0 : a.sortBy));
                res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Your notifications fetched",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateNotification() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const key = req.params.userId;
                const ids = req.body;
                let data = yield this.getCachedData(key);
                const unchanged = data === null || data === void 0 ? void 0 : data.filter((not) => !ids.includes(not === null || not === void 0 ? void 0 : not.id));
                data = data === null || data === void 0 ? void 0 : data.map((notification) => {
                    if (ids.includes(notification.id)) {
                        notification.read = true;
                    }
                    return notification;
                });
                const updatedNotification = unchanged.concat(data);
                yield redis_1.default.set(key, JSON.stringify(updatedNotification));
                res.status(http_status_1.default.OK).json({
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Notifications marked as read",
                    data: data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCachedData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield redis_1.default.get(key);
            if (data) {
                return JSON.parse(data);
            }
            else {
                return [];
            }
        });
    }
    removeCache(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.del(key);
        });
    }
}
exports.RedisCacheService = new RedisCache();
