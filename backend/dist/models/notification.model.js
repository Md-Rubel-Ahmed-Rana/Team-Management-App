"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const enums_1 = require("enums");
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(enums_1.NotificationEnums),
        required: true,
    },
    link: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(enums_1.NotificationStatusEnum),
        default: "unread",
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Notification = (0, mongoose_1.model)("Notification", notificationSchema);
