import { z } from 'zod';
import { emailSchema } from './fieldsShemas.js';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: emailSchema,
    businessName: z.string().min(1, 'Business name is required'),
    password: z
        .string()
        .min(8, 'Password must contain at least 8 characters')
        .max(72, 'Password must contain at most 72 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
});
