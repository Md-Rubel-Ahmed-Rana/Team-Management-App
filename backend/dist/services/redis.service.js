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
exports.RedisService = void 0;
const redis_1 = __importDefault(require("@/configurations/redis"));
class RedisCache {
    set(key, data, expireSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedData = JSON.stringify(data);
            const options = {};
            if (expireSeconds) {
                options.EX = expireSeconds;
            }
            yield redis_1.default.set(key, serializedData, options);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield redis_1.default.get(key);
            if (data) {
                try {
                    return JSON.parse(data);
                }
                catch (error) {
                    console.error(`Error parsing JSON for key "${key}":`, error);
                    return null;
                }
            }
            return null;
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.del(key);
        });
    }
}
exports.RedisService = new RedisCache();
