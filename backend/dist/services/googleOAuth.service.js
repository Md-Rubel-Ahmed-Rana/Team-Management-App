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
exports.GoogleOAuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("@/models/user.model"));
const envConfig_1 = require("@/configurations/envConfig");
class Service {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // check user existence
            const isExist = yield user_model_1.default.findOne({ email: data.email });
            const jwtPayload = {
                id: "",
                email: "",
            };
            if (isExist) {
                jwtPayload.id = isExist._id;
                jwtPayload.email = isExist.email;
                const accessToken = jsonwebtoken_1.default.sign(jwtPayload, envConfig_1.config.jwt.accessTokenSecret, {
                    expiresIn: envConfig_1.config.jwt.accessTokenExpired,
                });
                return accessToken;
            }
            else {
                const result = yield user_model_1.default.create(data);
                jwtPayload.id = result._id;
                jwtPayload.email = result.email;
                const accessToken = jsonwebtoken_1.default.sign(jwtPayload, envConfig_1.config.jwt.accessTokenSecret, {
                    expiresIn: envConfig_1.config.jwt.accessTokenExpired,
                });
                return accessToken;
            }
        });
    }
}
exports.GoogleOAuthService = new Service();
