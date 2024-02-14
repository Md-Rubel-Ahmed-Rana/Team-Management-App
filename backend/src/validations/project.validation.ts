import { z } from "zod";

const createZodSchema = z.object({
  body: z
    .object({
      team: z
        .string({
          required_error: "Team id is required",
          invalid_type_error: "Team id must be string",
        })
        .min(1)
        .max(255),
      user: z
        .string({
          required_error: "User id is required",
          invalid_type_error: "User id must be string",
        })
        .min(1)
        .max(255),
      name: z
        .string({
          required_error: "Project name is required",
          invalid_type_error: "Project name must be string",
        })
        .min(1)
        .max(255),
      category: z
        .string({
          required_error: "Project category is required",
          invalid_type_error: "Project category must be string",
        })
        .min(1)
        .max(255),
    })
    .strict(),
});

const updateZodSchema = z.object({
  body: z
    .object({
      team: z.string().min(1).max(255).optional(),
      user: z.string().min(1).max(255).optional(),
      name: z.string().min(1).max(255).optional(),
      category: z.string().min(1).max(255).optional(),
      members: z.array(z.object({})).optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const ProjectValidationSchema = { createZodSchema, updateZodSchema };
