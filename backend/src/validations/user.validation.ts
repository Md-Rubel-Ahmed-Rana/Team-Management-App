import { z } from "zod";

const registerZodSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).max(255),
      profile_picture: z.string().optional(),
      email: z.string().email(),
      department: z.string().min(1).max(255),
      designation: z.string().min(1).max(255),
      password: z.string().min(6),
    })
    .strict(),
});

const loginZodSchema = z.object({
  body: z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .strict(),
});

const updateZodSchema = z.object({
  body: z
    .object({
      id: z.string().min(1).max(255).optional(),
      name: z.string().min(1).max(255).optional(),
      profile_picture: z.string().optional(),
      email: z.string().email().optional(),
      department: z.string().min(1).max(255).optional(),
      designation: z.string().min(1).max(255).optional(),
      password: z.string().min(6).optional(),
      phoneNumber: z.string().optional(),
      permanentAddress: z.string().optional(),
      presentAddress: z.string().optional(),
      country: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    })
    .strict(),
});

export const UserValidationSchema = {
  loginZodSchema,
  registerZodSchema,
  updateZodSchema,
};
