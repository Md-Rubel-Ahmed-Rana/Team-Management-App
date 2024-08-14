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
exports.deleteMultipleFileFromCloudinary = exports.deleteSingleFileFromCloudinary = void 0;
const envConfig_1 = require("@/configurations/envConfig");
const axios_1 = __importDefault(require("axios"));
const deleteSingleFileFromCloudinary = (public_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.delete(`${envConfig_1.config.cloudinary.cloudinaryApi}/delete/single`, {
            data: { public_id },
        });
        console.log("File deleted successfully:", public_id);
        return { success: true, data: response.data };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error deleting file from Cloudinary:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        // Return an object with success: false but do not throw an error
        return { success: false, error: error.message };
    }
});
exports.deleteSingleFileFromCloudinary = deleteSingleFileFromCloudinary;
const deleteMultipleFileFromCloudinary = (public_ids) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.delete(`${envConfig_1.config.cloudinary.cloudinaryApi}/delete/many`, {
            data: public_ids,
        });
        console.log("Files deleted successfully:", public_ids);
        return { success: true, data: response.data };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error("Error deleting files from Cloudinary:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        // Return an object with success: false but do not throw an error
        return { success: false, error: error.message };
    }
});
exports.deleteMultipleFileFromCloudinary = deleteMultipleFileFromCloudinary;
