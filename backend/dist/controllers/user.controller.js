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
const user_service_1 = require("@/services/user.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
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
        this.auth = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req === null || req === void 0 ? void 0 : req.id;
            const result = yield user_service_1.UserService.auth(id);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "User fetched  successfully",
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
            const result = yield user_service_1.UserService.updateUser(id, req.body);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "User updated successfully",
                data: result,
            });
        }));
        this.login = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield user_service_1.UserService.login(email, password);
            res.cookie("tmAccessToken", result, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Login successful",
                data: null,
            });
        }));
    }
}
exports.UserController = new Controller();
