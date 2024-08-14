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
const mapper_1 = require("../mapper");
const message_entity_1 = require("@/entities/message.entity");
const create_1 = require("@/dto/message/create");
const get_1 = require("@/dto/message/get");
const update_1 = require("@/dto/message/update");
const delete_1 = require("@/dto/message/delete");
class Service {
    createMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.create(data);
            const mappedData = mapper_1.mapper.map(result, message_entity_1.MessageEntity, create_1.CreateMessageDTO);
            return mappedData;
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
                select: ["name", "profile_picture"],
            });
            const mappedData = mapper_1.mapper.mapArray(result, message_entity_1.MessageEntity, get_1.GetMessageDTO);
            return mappedData;
        });
    }
    getMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findById(messageId).populate({
                path: "poster",
                model: "User",
            });
            const mappedData = mapper_1.mapper.map(result, message_entity_1.MessageEntity, get_1.GetMessageDTO);
            return mappedData;
        });
    }
    getMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.Message.findById(messageId);
        });
    }
    updateMessage(messageId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findByIdAndUpdate(messageId, { $set: { text } }, { new: true });
            const mappedData = mapper_1.mapper.map(result, message_entity_1.MessageEntity, update_1.UpdateMessageDTO);
            return mappedData;
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findByIdAndDelete(messageId);
            const mappedData = mapper_1.mapper.map(result, message_entity_1.MessageEntity, delete_1.DeleteMessageDTO);
            return mappedData;
        });
    }
}
exports.MessageService = new Service();
