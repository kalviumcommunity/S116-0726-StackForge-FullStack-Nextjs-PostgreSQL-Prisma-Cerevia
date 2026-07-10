import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(100, { message: 'Full name cannot exceed 100 characters' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' }),
  avatar: z
    .string()
    .url({ message: 'Avatar must be a valid URL' })
    .optional()
    .or(z.literal(''))
    .or(z.null()),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
