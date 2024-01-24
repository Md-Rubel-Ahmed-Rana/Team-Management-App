import { z } from "zod";

const createZodSchema = z.object({
  body: z
    .object({
      teamId: z.string().min(1).max(255),
      userId: z.string().min(1).max(255),
      name: z.string().min(1).max(255),
      category: z.string().min(1).max(255),
      members: z.array(
        z.object({
          role: z.string().optional(),
          member: z.string().min(1).max(255),
        })
      ),
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
      members: z
        .array(
          z.object({
            role: z.string().optional(),
            member: z.string().min(1).max(255).optional(),
          })
        )
        .optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const ProjectValidationSchema = { createZodSchema, updateZodSchema };
