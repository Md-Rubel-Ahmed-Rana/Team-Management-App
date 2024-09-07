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
const mongoose_1 = require("mongoose");
const cache_service_1 = require("./cache.service");
const message_service_1 = require("./message.service");
class Service {
    // Temporarily using as alternative of DTO
    userSanitizer(user) {
        return {
            id: String(user === null || user === void 0 ? void 0 : user._id),
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            department: (user === null || user === void 0 ? void 0 : user.department) || "",
            designation: (user === null || user === void 0 ? void 0 : user.designation) || "",
            phoneNumber: (user === null || user === void 0 ? void 0 : user.phoneNumber) || "",
            profile_picture: (user === null || user === void 0 ? void 0 : user.profile_picture) || "",
            presentAddress: (user === null || user === void 0 ? void 0 : user.presentAddress) || "",
            permanentAddress: (user === null || user === void 0 ? void 0 : user.permanentAddress) || "",
            country: (user === null || user === void 0 ? void 0 : user.country) || "",
            createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
            updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt,
        };
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.find({}).select(propertySelections_1.UserSelect);
            const dtoUsers = result.map((user) => this.userSanitizer(user));
            yield cache_service_1.CacheServiceInstance.user.setAllUsersToCache(dtoUsers);
            return dtoUsers;
        });
    }
    myChatFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const objectId = mongoose_1.Types.ObjectId.isValid(userId)
                    ? new mongoose_1.Types.ObjectId(userId)
                    : null;
                if (!objectId) {
                    throw new Error("Invalid userId format");
                }
                const distinctUserIds = yield message_service_1.MessageService.getDistinctUserIds(objectId, userId);
                if (!(distinctUserIds === null || distinctUserIds === void 0 ? void 0 : distinctUserIds.length)) {
                    return [];
                }
                const userIds = (_a = distinctUserIds === null || distinctUserIds === void 0 ? void 0 : distinctUserIds.map((entry) => {
                    return mongoose_1.Types.ObjectId.isValid(entry === null || entry === void 0 ? void 0 : entry.userId)
                        ? new mongoose_1.Types.ObjectId(entry === null || entry === void 0 ? void 0 : entry.userId)
                        : null;
                })) === null || _a === void 0 ? void 0 : _a.filter((id) => id !== null);
                // Fetch users corresponding to these user IDs
                const usersData = yield user_model_1.default.find({ _id: { $in: userIds } });
                const dtoUsers = usersData === null || usersData === void 0 ? void 0 : usersData.map((user) => this.userSanitizer(user));
                // Fetch the latest message and include it in the response
                const userDetailsWithLastMessage = yield Promise.all(dtoUsers.map((user) => __awaiter(this, void 0, void 0, function* () {
                    const lastMessageDoc = yield message_service_1.MessageService.getLastMessage(objectId, userId, user);
                    const lastMessage = {
                        text: lastMessageDoc === null || lastMessageDoc === void 0 ? void 0 : lastMessageDoc.text,
                        files: lastMessageDoc === null || lastMessageDoc === void 0 ? void 0 : lastMessageDoc.files,
                        images: lastMessageDoc === null || lastMessageDoc === void 0 ? void 0 : lastMessageDoc.images,
                        createdAt: lastMessageDoc === null || lastMessageDoc === void 0 ? void 0 : lastMessageDoc.createdAt,
                    };
                    const friend = {
                        id: user === null || user === void 0 ? void 0 : user.id,
                        name: user === null || user === void 0 ? void 0 : user.name,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        profile_picture: user === null || user === void 0 ? void 0 : user.profile_picture,
                        lastMessage,
                    };
                    return friend;
                })));
                // Sort users based on the creation date of the most recent message
                userDetailsWithLastMessage.sort((a, b) => {
                    var _a, _b;
                    const dateA = ((_a = a.lastMessage) === null || _a === void 0 ? void 0 : _a.createdAt) || new Date(0);
                    const dateB = ((_b = b.lastMessage) === null || _b === void 0 ? void 0 : _b.createdAt) || new Date(0);
                    return dateB.getTime() - dateA.getTime();
                });
                return userDetailsWithLastMessage;
            }
            catch (error) {
                console.error("Error fetching chat friends:", error);
                throw new Error("Failed to fetch chat friends.");
            }
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
            const newUser = yield user_model_1.default.create(user);
            const dtoUser = this.userSanitizer(newUser);
            yield cache_service_1.CacheServiceInstance.user.addNewUserToCache(dtoUser);
            return newUser;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id).select(propertySelections_1.UserSelect);
            if (!user) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.NOT_FOUND, "User not found");
            }
            return this.userSanitizer(user);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: email }).select(propertySelections_1.UserSelect);
            if (!user) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.NOT_FOUND, "User not found");
            }
            return this.userSanitizer(user);
        });
    }
    findUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: email });
            if (!user) {
                throw new apiError_1.default(httpStatus_1.HttpStatusInstance.NOT_FOUND, "User not found");
            }
            return user;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.findByIdAndUpdate(id, { $set: Object.assign({}, data) }, { new: true }).select(propertySelections_1.UserSelect);
            const dtoUser = this.userSanitizer(result);
            yield cache_service_1.CacheServiceInstance.user.updateUserInCache(dtoUser);
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
