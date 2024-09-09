"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = exports.packageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.packageSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    packages: [
        {
            plan: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Plan",
            },
            paymentId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Payment",
            },
            limit: {
                team: {
                    teamCount: {
                        type: Number,
                        required: true,
                    },
                    memberCount: {
                        type: Number,
                        required: true,
                    },
                },
                projectCount: {
                    type: Number,
                    required: true,
                },
            },
            isCurrent: {
                type: Boolean,
                default: true,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
exports.Package = (0, mongoose_1.model)("Package", exports.packageSchema);
