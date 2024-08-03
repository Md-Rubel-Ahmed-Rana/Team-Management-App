"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailFromCredentials = void 0;
const generateEmailFromCredentials = (name, id) => {
    const newEmail = name.split(" ").join("").toLowerCase() + id + "@gmail.com";
    return newEmail;
};
exports.generateEmailFromCredentials = generateEmailFromCredentials;
