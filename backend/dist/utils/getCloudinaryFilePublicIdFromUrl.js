"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractCloudinaryPublicId = (url) => {
    const regex = /public_id=([^?]+)/;
    const match = url.match(regex);
    const public_id = match[1];
    return public_id;
};
exports.default = extractCloudinaryPublicId;
