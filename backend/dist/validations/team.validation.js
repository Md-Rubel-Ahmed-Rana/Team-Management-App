"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamValidationSchema = void 0;
const zod_1 = require("zod");
const createTeamValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            required_error: "Team name is required",
            invalid_type_error: "Team name must be string",
        })
            .min(1)
            .max(255),
        category: zod_1.z
            .string({
            required_error: "Team category is required",
            invalid_type_error: "Team category must be string",
        })
            .min(1)
            .max(255),
        description: zod_1.z
            .string({
            required_error: "Team description is required",
            invalid_type_error: "Team description must be string",
        })
            .min(1),
        image: zod_1.z
            .string({
            required_error: "Team image is required",
            invalid_type_error: "Team image must be a url/link",
        })
            .url(),
        admin: zod_1.z
            .string({
            required_error: "Team admin id is required",
            invalid_type_error: "Team admin id must be string",
        })
            .min(1)
            .max(255),
        activeMembers: zod_1.z.array(zod_1.z.string().optional()).optional(),
        pendingMembers: zod_1.z.array(zod_1.z.string().optional()).optional(),
    })
        .strict(),
});
const updateTeamValidation = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(1).max(255).optional(),
        category: zod_1.z.string().min(1).max(255).optional(),
        description: zod_1.z.string().min(1).optional(),
        image: zod_1.z.string().optional(),
        admin: zod_1.z.string().optional(),
        activeMembers: zod_1.z.array(zod_1.z.string()).optional(),
        pendingMembers: zod_1.z.array(zod_1.z.string()).optional(),
        createdAt: zod_1.z.string().optional(),
        updatedAt: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.TeamValidationSchema = {
    createTeamValidation,
    updateTeamValidation,
};
