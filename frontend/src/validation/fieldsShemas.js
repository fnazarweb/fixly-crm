import z from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js/max';

export const emailSchema = z.string().trim().pipe(z.email('Invalid email'));

export const phoneSchema = z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .refine((phone) => isValidPhoneNumber(phone, 'PL'), 'Invalid phone number');
