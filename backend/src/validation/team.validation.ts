import { z } from "zod";

const createTeamValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Team Name is required" }),
    category: z.string({
      required_error: "Team Category is required",
    }),
    description: z.string({
      required_error: "Team Description is required",
    }),
    image: z.string().optional(),
  }),
});

const updateTeamValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const TeamValidationSchema = {
  createTeamValidation,
  updateTeamValidation,
};
