"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// Middleware to update `isCurrent` field before saving
exports.packageSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageDoc = this;
        console.log({ packageDoc });
        // If there is a package marked as current, set isCurrent to false for all previous ones
        if (packageDoc.isModified("packages")) {
            const userId = packageDoc.user;
            console.log({ userId });
            const PackageModel = (0, mongoose_1.model)("Package");
            // Update all other packages for the user, setting `isCurrent` to false
            const myPackages = yield PackageModel.updateMany({ user: userId, "packages.isCurrent": true }, { $set: { "packages.$[].isCurrent": false } });
            console.log({ myPackages });
        }
        next();
    });
});
exports.Package = (0, mongoose_1.model)("Package", exports.packageSchema);
