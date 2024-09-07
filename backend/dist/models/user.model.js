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
        required: false,
        default: "",
    },
    designation: {
        type: String,
        required: false,
        default: "",
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "",
    },
    permanentAddress: {
        type: String,
        required: false,
        default: "",
    },
    presentAddress: {
        type: String,
        required: false,
        default: "",
    },
    country: {
        type: String,
        required: false,
        default: "",
    },
    password: {
        type: String,
        default: "",
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
