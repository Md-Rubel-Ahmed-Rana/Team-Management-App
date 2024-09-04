"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    projects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Project",
            default: [],
        },
    ],
    leaveRequests: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    activeMembers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
    pendingMembers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            default: [],
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
const Team = (0, mongoose_1.model)("Team", teamSchema);
exports.default = Team;
