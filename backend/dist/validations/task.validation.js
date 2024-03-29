"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidationSchema = void 0;
const zod_1 = require("zod");
const createZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({ required_error: "Task name is required" })
            .min(1)
            .max(255),
        deadline: zod_1.z.string().min(1).optional(),
        project: zod_1.z.string({ required_error: "Project is is required" }),
        status: zod_1.z.string().optional(),
        assignedTo: zod_1.z.string({
            required_error: "Assigned to member id required",
        }),
        assignedBy: zod_1.z.string({ required_error: "Assigner id required" }),
    })
        .strict(),
});
const updateZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        _id: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        deadline: zod_1.z.string().min(1).optional(),
        project: zod_1.z.string().optional(),
        assignedTo: zod_1.z.string().optional(),
        assignedBy: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        createdAt: zod_1.z.string().optional(),
        updatedAt: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.TaskValidationSchema = { createZodSchema, updateZodSchema };
