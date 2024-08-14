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
exports.uploadMessageImageAndFiles = exports.uploadMultipleFiles = exports.uploadSingleFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const makeUrlFromFileObject_1 = __importDefault(require("@/utils/makeUrlFromFileObject"));
const envConfig_1 = require("@/configurations/envConfig");
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.upload = upload;
const rootFolder = "team-manager";
const uploadSingleFile = (folderName) => {
    const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!req.file) {
            delete req.body.file;
            return next();
        }
        try {
            const formData = new form_data_1.default();
            formData.append("file", fs_1.default.createReadStream(req.file.path));
            const response = yield axios_1.default.post(`${envConfig_1.config.cloudinary.cloudinaryApi}/upload/single?folderName=${folder}`, formData, {
                headers: Object.assign({}, formData.getHeaders()),
            });
            const extension = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) === null || _b === void 0 ? void 0 : _b.split(".").pop();
            const dataUrl = (0, makeUrlFromFileObject_1.default)(Object.assign(Object.assign({}, response.data.data), { extension }));
            req.link = dataUrl;
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
        finally {
            fs_1.default.unlink(req.file.path, (err) => {
                if (err)
                    console.error("Failed to delete uploaded file:", err);
            });
        }
    });
};
exports.uploadSingleFile = uploadSingleFile;
const uploadMultipleFiles = (folderName) => {
    const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.files || !Array.isArray(req.files)) {
            delete req.body.files;
            return next();
        }
        try {
            const uploadResponses = yield Promise.all(req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const formData = new form_data_1.default();
                formData.append("file", fs_1.default.createReadStream(file.path));
                const response = yield axios_1.default.post(`${envConfig_1.config.cloudinary.cloudinaryApi}/upload/single?folderName=${folder}`, formData, {
                    headers: Object.assign({}, formData.getHeaders()),
                });
                // Clean up the uploaded file from the server
                fs_1.default.unlink(file.path, (err) => {
                    if (err)
                        console.error("Failed to delete uploaded file:", err);
                });
                const extension = (_a = file === null || file === void 0 ? void 0 : file.originalname) === null || _a === void 0 ? void 0 : _a.split(".").pop();
                const dataUrl = (0, makeUrlFromFileObject_1.default)(Object.assign(Object.assign({}, response.data.data), { extension }));
                return dataUrl;
            })));
            req.links = uploadResponses;
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                data: null,
            });
        }
    });
};
exports.uploadMultipleFiles = uploadMultipleFiles;
const uploadMessageImageAndFiles = (folderName) => {
    const folder = folderName ? `${rootFolder}/${folderName}` : rootFolder;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const images = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.images) || [];
        const files = ((_b = req.files) === null || _b === void 0 ? void 0 : _b.files) || [];
        let uploadedFiles = [];
        let uploadedImages = [];
        try {
            if (files.length > 0) {
                uploadedFiles = yield handleUpload(files, `${folder}/files`);
            }
            if (images.length > 0) {
                uploadedImages = yield handleUpload(images, `${folder}/images`);
            }
            req.body.images = uploadedImages;
            req.body.files = uploadedFiles;
        }
        catch (error) {
            console.error("Error uploading files or images:", error);
        }
        finally {
            next();
        }
    });
};
exports.uploadMessageImageAndFiles = uploadMessageImageAndFiles;
const handleUpload = (files, folder) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const uploadedFiles = [];
    const formData = new form_data_1.default();
    files.forEach((file) => {
        formData.append("files", fs_1.default.createReadStream(file.path));
    });
    try {
        const response = yield axios_1.default.post(`${envConfig_1.config.cloudinary.cloudinaryApi}/upload/many?folderName=${folder}`, formData, {
            headers: formData.getHeaders(),
        });
        (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data.forEach((obj, index) => {
            var _a, _b;
            const extension = (_b = (_a = files[index]) === null || _a === void 0 ? void 0 : _a.originalname) === null || _b === void 0 ? void 0 : _b.split(".").pop();
            const dataUrl = (0, makeUrlFromFileObject_1.default)(Object.assign(Object.assign({}, obj), { extension: extension }));
            uploadedFiles.push(dataUrl);
        });
    }
    catch (error) {
        console.error("Failed to upload files:", error);
    }
    finally {
        files.forEach((file) => {
            fs_1.default.unlink(file.path, (err) => {
                if (err)
                    console.error("Failed to delete uploaded file:", err);
            });
        });
    }
    return uploadedFiles;
});
