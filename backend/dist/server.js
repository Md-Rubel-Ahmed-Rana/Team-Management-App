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
const app_1 = __importDefault(require("./app"));
const envConfig_1 = require("./configurations/envConfig");
const database_1 = require("./configurations/database");
const redis_1 = require("./configurations/redis");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    app_1.default.listen(envConfig_1.config.app.port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Application  listening on port ${envConfig_1.config.app.port}`);
        yield database_1.Database.connect();
        yield redis_1.RedisClient.connect();
    }));
});
bootstrap();
