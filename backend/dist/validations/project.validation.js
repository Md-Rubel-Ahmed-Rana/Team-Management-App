"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidationSchema = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        team: zod_1.z
            .string({
            required_error: "Team id is required",
            invalid_type_error: "Team id must be string",
        })
            .min(1)
            .max(255),
        user: zod_1.z
            .string({
            required_error: "User id is required",
            invalid_type_error: "User id must be string",
        })
            .min(1)
            .max(255),
        name: zod_1.z
            .string({
            required_error: "Project name is required",
            invalid_type_error: "Project name must be string",
        })
            .min(1)
            .max(255),
        category: zod_1.z
            .string({
            required_error: "Project category is required",
            invalid_type_error: "Project category must be string",
        })
            .min(1)
            .max(255),
    })
        .strict(),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        team: zod_1.z.string().min(1).max(255).optional(),
        user: zod_1.z.string().min(1).max(255).optional(),
        name: zod_1.z.string().min(1).max(255).optional(),
        category: zod_1.z.string().min(1).max(255).optional(),
        members: zod_1.z.array(zod_1.z.object({})).optional(),
        createdAt: zod_1.z.string().optional(),
        updatedAt: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.ProjectValidationSchema = { createZodSchema, updateZodSchema };
