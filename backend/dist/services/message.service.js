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
exports.MessageService = exports.Service = void 0;
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
            const { _id: msId, conversationId, text, type, images, files, createdAt, poster: { _id: userId, name, profile_picture }, } = populatedResult;
            const emitData = {
                id: msId,
                conversationId: conversationId,
                text: text,
                type: type,
                poster: {
                    id: userId,
                    name: name,
                    profile_picture: profile_picture,
                },
                files: files,
                images: images,
                createdAt: createdAt,
            };
            return emitData;
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
    getDistinctUserIds(objectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const distinctUserIds = yield message_model_1.Message.aggregate([
                {
                    $match: {
                        $or: [
                            { poster: objectId },
                            {
                                conversationId: {
                                    $regex: new RegExp(`^(${userId}&|${userId}$)`),
                                },
                            },
                        ],
                    },
                },
                {
                    $group: {
                        _id: null,
                        uniqueUsers: {
                            $addToSet: {
                                $cond: [
                                    { $eq: ["$poster", objectId] },
                                    {
                                        $cond: [
                                            {
                                                $eq: [
                                                    {
                                                        $arrayElemAt: [
                                                            { $split: ["$conversationId", "&"] },
                                                            0,
                                                        ],
                                                    },
                                                    userId,
                                                ],
                                            },
                                            {
                                                $arrayElemAt: [{ $split: ["$conversationId", "&"] }, 1],
                                            },
                                            {
                                                $arrayElemAt: [{ $split: ["$conversationId", "&"] }, 0],
                                            },
                                        ],
                                    },
                                    "$poster",
                                ],
                            },
                        },
                    },
                },
                {
                    $unwind: "$uniqueUsers",
                },
                {
                    $project: {
                        userId: "$uniqueUsers",
                    },
                },
            ]);
            return distinctUserIds;
        });
    }
    getLastMessage(objectId, userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastMessages = yield message_model_1.Message.findOne({
                $or: [
                    {
                        $and: [
                            { poster: objectId },
                            {
                                conversationId: {
                                    $regex: `^${user === null || user === void 0 ? void 0 : user.id.toString()}&${userId}|${userId}&${user === null || user === void 0 ? void 0 : user.id.toString()}$`,
                                },
                            },
                        ],
                    },
                    {
                        $and: [
                            { poster: user === null || user === void 0 ? void 0 : user.id },
                            {
                                conversationId: {
                                    $regex: `^${userId}&${user === null || user === void 0 ? void 0 : user.id.toString()}|${user === null || user === void 0 ? void 0 : user.id.toString()}&${userId}$`,
                                },
                            },
                        ],
                    },
                ],
            }).sort({ createdAt: -1 });
        });
    }
    getOneToOneMessagesWithType(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = conversationId.split("&");
            const result = yield message_model_1.Message.find({
                $or: [
                    { conversationId: `${ids[0]}&${ids[1]}` },
                    { conversationId: `${ids[1]}&${ids[0]}` },
                ],
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
            var _a, _b, _c;
            const result = yield message_model_1.Message.findByIdAndUpdate(messageId, { $set: { text } }, { new: true }).populate({
                path: "poster",
                model: "User",
                select: propertySelections_1.UserSelect,
            });
            const updatedMessage = {
                id: result === null || result === void 0 ? void 0 : result.id,
                conversationId: result === null || result === void 0 ? void 0 : result.conversationId,
                type: result === null || result === void 0 ? void 0 : result.type,
                text: result === null || result === void 0 ? void 0 : result.text,
                files: result === null || result === void 0 ? void 0 : result.files,
                images: result.images,
                createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
                poster: {
                    id: (_a = result === null || result === void 0 ? void 0 : result.poster) === null || _a === void 0 ? void 0 : _a.id,
                    name: (_b = result === null || result === void 0 ? void 0 : result.poster) === null || _b === void 0 ? void 0 : _b.name,
                    profile_picture: (_c = result === null || result === void 0 ? void 0 : result.poster) === null || _c === void 0 ? void 0 : _c.profile_picture,
                },
            };
            return updatedMessage;
        });
    }
    deleteMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield message_model_1.Message.findByIdAndDelete(messageId);
            return result;
        });
    }
}
exports.Service = Service;
exports.MessageService = new Service();
