import z from 'zod';
import {
    isValidPhoneNumber,
    parsePhoneNumberWithError,
} from 'libphonenumber-js/max';

export const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Invalid email'));

export const phoneSchema = z
    .string('Phone number is required')
    .trim()
    .refine((phone) => isValidPhoneNumber(phone, 'PL'), 'Invalid phone number')
    .transform((phone) => parsePhoneNumberWithError(phone, 'PL').number);
