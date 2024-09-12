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
exports.PackageController = void 0;
const package_service_1 = require("@/services/package.service");
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.getMyPackage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
            const myPackage = yield package_service_1.PackageService.getMyPackage(userId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "My package fetched successfully!",
                data: myPackage,
            });
        }));
        this.renewPackage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, planId, packageId } = req.params;
            const result = yield package_service_1.PackageService.renewPackage(userId, planId, packageId);
            this.apiResponse(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: "Your package is being renewed",
                data: result,
            });
        }));
    }
}
exports.PackageController = new Controller();
