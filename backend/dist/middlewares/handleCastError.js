"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: "Invalid Id",
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast Error",
        errorMessages: errors,
    };
};
exports.default = handleCastError;
