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
exports.UserController = void 0;
const deletePreviousFileFromCloudinary_1 = require("@/utils/deletePreviousFileFromCloudinary");
const user_service_1 = require("@/services/user.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const getCloudinaryFilePublicIdFromUrl_1 = __importDefault(require("@/utils/getCloudinaryFilePublicIdFromUrl"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.getAllUsers = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield user_service_1.UserService.getAllUsers();
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Users fetched  successfully",
                data: result,
            });
        }));
        this.register = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.register(req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Registered successfully",
                data: null,
            });
        }));
        this.updateUser = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (req.link) {
                const user = yield user_service_1.UserService.findUserById(id);
                const profile_picture = user === null || user === void 0 ? void 0 : user.profile_picture;
                if (profile_picture) {
                    const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(profile_picture);
                    if (public_id) {
                        yield (0, deletePreviousFileFromCloudinary_1.deleteSingleFileFromCloudinary)(public_id);
                    }
                }
            }
            const data = req.link
                ? Object.assign(Object.assign({}, req.body), { profile_picture: req.link }) : req.body;
            const result = yield user_service_1.UserService.updateUser(id, data);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "User updated successfully",
                data: result,
            });
        }));
        this.forgetPassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const result = yield user_service_1.UserService.forgetPassword(email);
            if (!(result === null || result === void 0 ? void 0 : result.user)) {
                this.apiResponse(res, {
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: "User not found",
                    data: null,
                });
            }
            else if (result === null || result === void 0 ? void 0 : result.messageId) {
                this.apiResponse(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Reset password link was send to your mail. Please check your inbox",
                    data: null,
                });
            }
            else {
                this.apiResponse(res, {
                    success: false,
                    statusCode: http_status_1.default.BAD_REQUEST,
                    message: "Something went wrong to send reset email",
                    data: null,
                });
            }
        }));
        this.resetPassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, password } = req.body;
            yield user_service_1.UserService.resetPassword(userId, password);
            this.apiResponse(res, {
                success: true,
                statusCode: http_status_1.default.OK,
                message: "Your password was changed",
                data: null,
            });
        }));
        this.changePassword = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, oldPassword, newPassword } = req.body;
            const result = yield user_service_1.UserService.changePassword(userId, oldPassword, newPassword);
            if (!result) {
                this.apiResponse(res, {
                    success: false,
                    statusCode: http_status_1.default.OK,
                    message: "Your old password was not correct",
                    data: null,
                });
            }
            else {
                this.apiResponse(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Your password was changed",
                    data: null,
                });
            }
        }));
    }
}
exports.UserController = new Controller();
