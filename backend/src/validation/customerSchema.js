import { z } from 'zod';
import { phoneSchema, emailSchema } from './fieldsShemas.js';

export const customerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.preprocess(
        // If email is '' reassign to null
        (value) => (typeof value === 'string' && value === '' ? null : value),
        emailSchema.nullish()
    ),
    phone: phoneSchema,
});
