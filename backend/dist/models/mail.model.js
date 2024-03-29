"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModels = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
    },
});
const ContactMail = (0, mongoose_1.model)("ContactMail", contactSchema);
exports.MailModels = {
    ContactMail,
};
