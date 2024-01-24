import { z } from "zod";

const createZodSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: "Task name is required" })
        .min(1)
        .max(255),
      deadline: z.string().min(1).optional(),
      project: z.string({ required_error: "Project is is required" }),
      status: z.string().optional(),
      assignedTo: z.string({
        required_error: "Assigned to member id required",
      }),
      assignedBy: z.string({ required_error: "Assigner id required" }),
    })
    .strict(),
});

const updateZodSchema = z.object({
  body: z
    .object({
      _id: z.string().optional(),
      name: z.string().optional(),
      deadline: z.string().min(1).optional(),
      project: z.string().optional(),
      assignedTo: z.string().optional(),
      assignedBy: z.string().optional(),
      status: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const TaskValidationSchema = { createZodSchema, updateZodSchema };
