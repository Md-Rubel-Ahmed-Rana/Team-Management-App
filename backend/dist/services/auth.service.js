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
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("@/models/user.model"));
const jwt_1 = require("lib/jwt");
class Service {
    checkUserExistence(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.default.findOne({ email: data.email });
            const jwtPayload = {
                id: "",
                email: "",
            };
            if (isExist) {
                jwtPayload.id = isExist._id;
                jwtPayload.email = isExist.email;
                const accessToken = yield jwt_1.JwtInstance.accessToken(jwtPayload);
                const refreshToken = yield jwt_1.JwtInstance.refreshToken(jwtPayload);
                return { accessToken, refreshToken };
            }
            else {
                const result = yield user_model_1.default.create(data);
                jwtPayload.id = result._id;
                jwtPayload.email = result.email;
                const accessToken = yield jwt_1.JwtInstance.accessToken(jwtPayload);
                const refreshToken = yield jwt_1.JwtInstance.refreshToken(jwtPayload);
                return { accessToken, refreshToken };
            }
        });
    }
    googleLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.checkUserExistence(data);
            return tokens;
        });
    }
    facebookLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.checkUserExistence(data);
            return tokens;
        });
    }
    githubLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.checkUserExistence(data);
            return tokens;
        });
    }
    twitterLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield this.checkUserExistence(data);
            return tokens;
        });
    }
}
exports.AuthService = new Service();
