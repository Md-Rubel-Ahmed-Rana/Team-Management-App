"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractCloudinaryPublicId = (url) => {
    const regex = /public_id=([^?]+)/;
    const match = url.match(regex);
    if (match) {
        console.log("Remove cloudinary file");
        const public_id = match[1];
        return public_id;
    }
    else {
        console.log("This is not  cloudinary file");
        return null;
    }
};
exports.default = extractCloudinaryPublicId;
