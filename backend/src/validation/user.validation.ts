import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const registerZodSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    profile_picture: z.string().optional(),
    email: z.string().email(),
    department: z.string().min(1).max(255),
    designation: z.string().min(1).max(255),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

export const UserValidationSchema = {
  loginZodSchema,
  registerZodSchema,
};
