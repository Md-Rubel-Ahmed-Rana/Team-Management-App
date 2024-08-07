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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const redis_1 = require("redis");
const envConfig_1 = require("./envConfig");
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: envConfig_1.config.redis.host,
        port: Number(envConfig_1.config.redis.port),
    },
    password: envConfig_1.config.redis.password,
});
class RedisWrapper {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Redis database connecting...");
            try {
                yield redisClient.connect();
                console.log("Redis connected successfully");
            }
            catch (error) {
                console.log({
                    message: "Redis not connected",
                    error: error.message,
                });
            }
        });
    }
}
exports.RedisClient = new RedisWrapper();
exports.default = redisClient;
