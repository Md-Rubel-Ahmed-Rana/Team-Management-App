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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_model_1 = require("@/models/message.model");
const propertySelections_1 = require("propertySelections");
class Service {
    createMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.create(data);
            const populatedResult = yield result.populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
            return populatedResult;
        });
    }
    getMessagesByType(messageType, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.find({
                type: messageType,
                conversationId,
            }).populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
            return result;
        });
    }
    getMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findById(messageId).populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
            return result;
        });
    }
    getMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.Message.findById(messageId).populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
        });
    }
    updateMessage(messageId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findByIdAndUpdate(messageId, { $set: { text } }, { new: true }).populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
            return result;
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findByIdAndDelete(messageId);
            return result;
        });
    }
}
exports.MessageService = new Service();
