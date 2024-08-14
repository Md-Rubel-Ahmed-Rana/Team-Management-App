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
const message_service_1 = require("@/services/message.service");
const deletePreviousFileFromCloudinary_1 = require("./deletePreviousFileFromCloudinary");
const getCloudinaryFilePublicIdFromUrl_1 = __importDefault(require("./getCloudinaryFilePublicIdFromUrl"));
const deleteMessageFilesFromCloudinary = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const message = yield message_service_1.MessageService.getMessageById(messageId);
    const publicIds = [];
    if ((message === null || message === void 0 ? void 0 : message.images) && ((_a = message === null || message === void 0 ? void 0 : message.images) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        message === null || message === void 0 ? void 0 : message.images.forEach((imageUrl) => {
            const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(imageUrl);
            const newId = { public_id: public_id };
            publicIds.push(newId);
        });
    }
    if ((message === null || message === void 0 ? void 0 : message.files) && ((_b = message === null || message === void 0 ? void 0 : message.files) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        message === null || message === void 0 ? void 0 : message.files.forEach((fileUrl) => {
            const public_id = (0, getCloudinaryFilePublicIdFromUrl_1.default)(fileUrl);
            const newId = { public_id: public_id };
            publicIds.push(newId);
        });
    }
    if (publicIds.length > 0) {
        const result = yield (0, deletePreviousFileFromCloudinary_1.deleteMultipleFileFromCloudinary)(publicIds);
        console.log("Deleted files from message", result);
    }
    else {
        console.log("Files from message were not found to delete", publicIds);
    }
});
exports.default = deleteMessageFilesFromCloudinary;
