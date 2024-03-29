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
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("@/models/user.model"));
const apiError_1 = __importDefault(require("@/shared/apiError"));
const envConfig_1 = require("@/configurations/envConfig");
const mapper_1 = require("../mapper");
const user_entity_1 = require("@/entities/user.entity");
const get_1 = require("@/dto/user/get");
const update_1 = require("@/dto/user/update");
class Service {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.find({});
            const mappedData = mapper_1.mapper.mapArray(result, user_entity_1.UserEntity, get_1.GetUserDTO);
            return mappedData;
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.default.findOne({
                email: user === null || user === void 0 ? void 0 : user.email,
            });
            if (isExist) {
                throw new apiError_1.default(http_status_1.default.CONFLICT, "This email already exist");
            }
            const hashedPassword = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, 12);
            user.password = hashedPassword;
            yield user_model_1.default.create(user);
        });
    }
    auth(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            if (!user) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
            }
            const mappedUser = mapper_1.mapper.map(user, user_entity_1.UserEntity, get_1.GetUserDTO);
            return mappedUser;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true });
            const mappedUser = mapper_1.mapper.map(result, user_entity_1.UserEntity, update_1.UpdateUserDTO);
            return mappedUser;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.default.findOne({
                email,
            });
            if (!isExist) {
                throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
            }
            const isMatchedPassword = yield bcrypt_1.default.compare(password, isExist.password);
            if (!isMatchedPassword) {
                throw new apiError_1.default(401, "Password doesn't match");
            }
            const jwtPayload = {
                id: isExist._id,
                email: isExist.email,
            };
            const accessToken = jsonwebtoken_1.default.sign(jwtPayload, envConfig_1.config.jwt.accessTokenSecret, {
                expiresIn: envConfig_1.config.jwt.accessTokenExpired,
            });
            return accessToken;
        });
    }
}
exports.UserService = new Service();
