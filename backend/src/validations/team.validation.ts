import { z } from "zod";

const createTeamValidation = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Team name is required",
          invalid_type_error: "Team name must be string",
        })
        .min(1)
        .max(255),
      category: z
        .string({
          required_error: "Team category is required",
          invalid_type_error: "Team category must be string",
        })
        .min(1)
        .max(255),
      description: z
        .string({
          required_error: "Team description is required",
          invalid_type_error: "Team description must be string",
        })
        .min(1),
      admin: z
        .string({
          required_error: "Team admin id is required",
          invalid_type_error: "Team admin id must be string",
        })
        .min(1)
        .max(255),
    })
    .strict(),
});

const updateTeamValidation = z.object({
  body: z
    .object({
      name: z.string().min(1).max(255).optional(),
      category: z.string().min(1).max(255).optional(),
      description: z.string().min(1).optional(),
      image: z.string().optional(),
      admin: z.string().optional(),
      activeMembers: z.array(z.string()).optional(),
      pendingMembers: z.array(z.string()).optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const TeamValidationSchema = {
  createTeamValidation,
  updateTeamValidation,
};
