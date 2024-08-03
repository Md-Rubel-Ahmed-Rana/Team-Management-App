"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    profile_picture: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    permanentAddress: {
        type: String,
        required: false,
    },
    presentAddress: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    password: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
