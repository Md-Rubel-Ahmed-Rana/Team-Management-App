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
const envConfig_1 = require("@/configurations/envConfig");
const axios_1 = __importDefault(require("axios"));
const deletePreviousFileFromCloudinary = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const response = yield axios_1.default.delete(`${envConfig_1.config.cloudinary.cloudinaryApi}/delete/single`, {
            data: { public_id },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error deleting file from Cloudinary:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error(`Failed to delete file: ${((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error.message}`);
        }
        else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred while deleting the file.");
        }
    }
});
exports.default = deletePreviousFileFromCloudinary;
