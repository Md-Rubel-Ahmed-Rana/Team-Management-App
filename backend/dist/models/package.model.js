"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = exports.packageSchema = void 0;
const mongoose_1 = require("mongoose");
const dayjs_1 = __importDefault(require("dayjs"));
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
            payment: {
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
            start: {
                type: Date,
                default: Date.now,
                required: true,
            },
            end: {
                type: Date,
                default: () => (0, dayjs_1.default)().add(1, "month").toDate(),
                required: true,
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
