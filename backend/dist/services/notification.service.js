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
exports.NotificationService = void 0;
const notification_model_1 = require("@/models/notification.model");
const propertySelections_1 = require("propertySelections");
class Service {
    createNotification(notificationObject, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield notification_model_1.Notification.create([notificationObject], { session });
            const populatedResult = yield result[0].populate([
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
            console.log("New notification", populatedResult);
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
    deleteSingleNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notification_model_1.Notification.findByIdAndDelete(id);
        });
    }
    deleteManyNotifications(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ ids });
            yield notification_model_1.Notification.deleteMany({ _id: { $in: ids } });
        });
    }
}
exports.NotificationService = new Service();
