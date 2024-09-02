"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    poster: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    conversationId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["announcement", "resources", "discussion", "one-to-one"],
    },
    text: {
        type: String,
    },
    images: [{ type: String }],
    files: [{ type: String }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Message = (0, mongoose_1.model)("Message", messageSchema);
