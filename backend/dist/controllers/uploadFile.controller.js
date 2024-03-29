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
exports.UploadFileController = void 0;
const rootController_1 = __importDefault(require("@/shared/rootController"));
const http_status_1 = __importDefault(require("http-status"));
class Controller extends rootController_1.default {
    constructor() {
        super(...arguments);
        this.uploadSingleImage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Image not uploaded",
                    data: null,
                });
            }
            else {
                const imageUrl = req.file.path;
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Image uploaded successfully!",
                    data: imageUrl,
                });
            }
        }));
        this.uploadMultipleImage = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || req.files.length === 0) {
                this.apiResponse(res, {
                    statusCode: http_status_1.default.BAD_REQUEST,
                    success: false,
                    message: "Images not uploaded!",
                    data: null,
                });
            }
            else {
                const imageUrls = req.files.map((file) => file.path);
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Images uploaded successfully!",
                    data: imageUrls,
                });
            }
        }));
        this.uploadSingleFile = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                this.apiResponse(res, {
                    statusCode: http_status_1.default.BAD_REQUEST,
                    success: false,
                    message: "File not uploaded!",
                    data: null,
                });
            }
            else {
                const imageUrl = req.file.path;
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "File uploaded successfully!",
                    data: imageUrl,
                });
            }
        }));
        this.uploadMultipleFile = this.catchAsync((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.files || req.files.length === 0) {
                this.apiResponse(res, {
                    statusCode: http_status_1.default.BAD_REQUEST,
                    success: false,
                    message: "Files not uploaded!",
                    data: null,
                });
            }
            else {
                const fileUrls = req.files.map((file) => file.path);
                this.apiResponse(res, {
                    statusCode: http_status_1.default.OK,
                    success: true,
                    message: "Files uploaded successfully!",
                    data: fileUrls,
                });
            }
        }));
    }
}
exports.UploadFileController = new Controller();
