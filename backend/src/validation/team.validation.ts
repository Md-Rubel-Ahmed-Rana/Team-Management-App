import { z } from "zod";

const createTeamValidation = z.object({
  body: z
    .object({
      name: z.string().min(1).max(255),
      category: z.string().min(1).max(255),
      description: z.string().min(1),
      image: z.string(),
      admin: z.string().min(1).max(255), // Assuming admin is identified by some unique identifier
      activeMembers: z.array(z.string().min(1).max(255)),
      pendingMembers: z.array(z.string().min(1).max(255)),
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
      admin: z.string().min(1).max(255).optional(),
      activeMembers: z.array(z.string().min(1).max(255)).optional(),
      pendingMembers: z.array(z.string().min(1).max(255)).optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const TeamValidationSchema = {
  createTeamValidation,
  updateTeamValidation,
};
