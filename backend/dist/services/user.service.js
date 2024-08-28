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
const user_model_1 = __importDefault(require("@/models/user.model"));
const apiError_1 = __importDefault(require("@/shared/apiError"));
const envConfig_1 = require("@/configurations/envConfig");
const mail_util_1 = require("@/utils/mail.util");
const bcrypt_1 = require("lib/bcrypt");
const jwt_1 = require("lib/jwt");
const httpStatus_1 = require("lib/httpStatus");
const propertySelections_1 = require("propertySelections");
class Service {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.find({}).select(propertySelections_1.UserSelect);
            return result;
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.default.findOne({
                email: user === null || user === void 0 ? void 0 : user.email,
            });
            if (isExist) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.CONFLICT, "This email already exist");
            }
            const hashedPassword = yield bcrypt_1.BcryptInstance.hash(user.password);
            user.password = hashedPassword;
            yield user_model_1.default.create(user);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id).select(propertySelections_1.UserSelect);
            if (!user) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: email }).select(propertySelections_1.UserSelect);
            if (!user) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true }).select(propertySelections_1.UserSelect);
            return result;
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield user_model_1.default.findOne({ email: email }).select(propertySelections_1.UserSelect);
            if (!isUserExist) {
                return false;
            }
            else {
                const jwtPayload = {
                    id: isUserExist._id,
                    email: isUserExist.email,
                };
                const token = yield jwt_1.JwtInstance.generateAccessToken(jwtPayload);
                const encodedEmail = encodeURIComponent(isUserExist.email);
                const encodedName = encodeURIComponent(isUserExist.name);
                const link = `${envConfig_1.config.app.frontendDomain}/reset-password?token=${token}&userId=${isUserExist._id}&email=${encodedEmail}&name=${encodedName}`;
                const mailResult = yield mail_util_1.MailUtilService.sendResetPasswordLink(email, link);
                return { user: isUserExist, messageId: mailResult.messageId };
            }
        });
    }
    resetPassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.BcryptInstance.hash(password);
            yield user_model_1.default.findByIdAndUpdate(userId, {
                $set: { password: hashedPassword },
            });
        });
    }
    changePassword(userId, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(userId).select(propertySelections_1.UserSelect);
            const isPassMatch = yield bcrypt_1.BcryptInstance.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
            if (!isPassMatch) {
                return false;
            }
            else {
                const hashedPassword = yield bcrypt_1.BcryptInstance.hash(newPassword);
                yield user_model_1.default.findByIdAndUpdate(userId, {
                    $set: { password: hashedPassword },
                }).select(propertySelections_1.UserSelect);
                return true;
            }
        });
    }
}
exports.UserService = new Service();
