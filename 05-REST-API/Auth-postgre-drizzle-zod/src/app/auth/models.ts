import { z } from 'zod';

export const signupPayloadModel = z.object({
    firstName: z.string().trim().min(2, "Too short").max(50),
    lastName: z.string().trim().max(50).optional(),
    email: z.email("Invalid email").trim().toLowerCase(),
    password: z.string()
               .min(8, "At least 8 Character long")
               .max(64)
               .regex(/[A-Z]/, "Need an Uppercase letter")
               .regex(/[a-z]/, "Needs a lowercase letter")
               .regex(/[0-9]/, "Needs a number")
               .regex(/[^A-Za-z0-9]/, "Needs a Special Character")
});

export const signinPayloadModel = z.object({
    email: z.email().toLowerCase(),
    password: z.string().min(6)
});
