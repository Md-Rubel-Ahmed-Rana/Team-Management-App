"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const registerZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(1).max(255),
        profile_picture: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
        department: zod_1.z.string().min(1).max(255),
        designation: zod_1.z.string().min(1).max(255),
        password: zod_1.z.string().min(6),
    })
        .strict(),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    })
        .strict(),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        id: zod_1.z.string().min(1).max(255).optional(),
        name: zod_1.z.string().min(1).max(255).optional(),
        profile_picture: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        department: zod_1.z.string().min(1).max(255).optional(),
        designation: zod_1.z.string().min(1).max(255).optional(),
        password: zod_1.z.string().min(6).optional(),
        phoneNumber: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(),
        updatedAt: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.UserValidationSchema = {
    loginZodSchema,
    registerZodSchema,
    updateZodSchema,
};
