"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    sessionUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["success", "failed"],
        default: "failed",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
