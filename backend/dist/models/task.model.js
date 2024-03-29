"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    assignedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["Todo", "Ongoing", "Completed"],
        default: "Todo",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
