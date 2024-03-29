"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    plan: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: [String],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Plan = (0, mongoose_1.model)("Plan", planSchema);
