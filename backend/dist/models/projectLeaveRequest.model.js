"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLeaveRequest = void 0;
const mongoose_1 = require("mongoose");
const leaveRequestSchema = new mongoose_1.Schema({
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    member: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "ignored", "accepted"],
        default: "pending",
    },
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.ProjectLeaveRequest = (0, mongoose_1.model)("ProjectLeaveRequest", leaveRequestSchema);
