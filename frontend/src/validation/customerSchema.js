import { z } from 'zod';
import { phoneSchema, emailSchema } from './fieldsShemas.js';

export const customerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: emailSchema.nullish(),
    phone: phoneSchema,
});
