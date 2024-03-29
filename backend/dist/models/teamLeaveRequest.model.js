"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamLeaveRequest = void 0;
const mongoose_1 = require("mongoose");
const leaveRequestSchema = new mongoose_1.Schema({
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    team: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    member: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
exports.TeamLeaveRequest = (0, mongoose_1.model)("TeamLeaveRequest", leaveRequestSchema);
