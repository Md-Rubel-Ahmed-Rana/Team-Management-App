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
exports.NotificationService = void 0;
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("@/models/user.model"));
const redisCache_1 = require("@/middlewares/redisCache");
const redisCacheExpireDate_1 = require("@/constants/redisCacheExpireDate");
const envConfig_1 = require("@/configurations/envConfig");
const notification_model_1 = require("@/models/notification.model");
const propertySelections_1 = require("propertySelections");
class Service {
    sendNotification(senderId, receiverId, type, title, message, linkSuffix) {
        return __awaiter(this, void 0, void 0, function* () {
            // send notification to add  new  member to project
            const receiver = yield user_model_1.default.findById(receiverId).select({ name: 1 });
            const sender = yield user_model_1.default.findById(senderId).select({ name: 1 });
            if (sender && receiver) {
                const notification = {
                    id: (0, uuid_1.v4)(),
                    sortBy: Date.now(),
                    type,
                    createdAt: new Date(),
                    read: false,
                    content: {
                        title,
                        message,
                        link: `${envConfig_1.config.app.frontendDomain}/${linkSuffix}`,
                        data: {
                            sendBy: sender === null || sender === void 0 ? void 0 : sender.name,
                        },
                    },
                    recipient: {
                        userId: receiver === null || receiver === void 0 ? void 0 : receiver._id,
                        name: receiver === null || receiver === void 0 ? void 0 : receiver.name,
                    },
                };
                yield redisCache_1.RedisCacheService.insertOne(String(receiver === null || receiver === void 0 ? void 0 : receiver._id), notification, redisCacheExpireDate_1.cacheExpireDates.months[1]);
                return notification;
            }
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield notification_model_1.Notification.create(data);
            const populatedResult = yield result.populate([
                {
                    path: "sender",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "receiver",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return populatedResult;
        });
    }
    getNotificationsByReceiverId(receiverId_1) {
        return __awaiter(this, arguments, void 0, function* (receiverId, limit = 10) {
            // Step 1: Fetch unread notifications
            const unreadNotifications = yield notification_model_1.Notification.find({
                receiver: receiverId,
                status: "unread",
            })
                .populate([
                {
                    path: "sender",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ])
                .sort({ createdAt: -1 })
                .limit(limit);
            const unreadCount = unreadNotifications.length;
            let notifications = unreadNotifications;
            // Step 2: If unread notifications are less than the limit, fetch read notifications to fill the limit
            if (unreadCount < limit) {
                const readNotifications = yield notification_model_1.Notification.find({
                    receiver: receiverId,
                    status: "read",
                })
                    .populate([
                    {
                        path: "sender",
                        model: "User",
                        select: propertySelections_1.UserSelect,
                    },
                ])
                    .sort({ createdAt: -1 })
                    .limit(limit - unreadCount);
                notifications = notifications.concat(readNotifications);
            }
            // Step 3: Get the total count of notifications for the user
            const total = yield notification_model_1.Notification.countDocuments({ receiver: receiverId });
            return { payload: notifications, limit, total };
        });
    }
    getUnreadNotificationCount(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unreadNotifications = yield notification_model_1.Notification.find({
                receiver: receiverId,
                status: "unread",
            }).countDocuments();
            return unreadNotifications;
        });
    }
    markAllAsRead(receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unreadNotifications = yield notification_model_1.Notification.updateMany({
                receiver: receiverId,
                status: "unread",
            }, {
                $set: { status: "read" },
            });
            return unreadNotifications === null || unreadNotifications === void 0 ? void 0 : unreadNotifications.modifiedCount;
        });
    }
    updateStatusToRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield notification_model_1.Notification.findByIdAndUpdate(id, {
                $set: { status: "read" },
            }, { new: true }).populate([
                {
                    path: "sender",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
                {
                    path: "receiver",
                    model: "User",
                    select: propertySelections_1.UserSelect,
                },
            ]);
            return result;
        });
    }
}
exports.NotificationService = new Service();
