import { z } from 'zod'

export const loginPayloadSchema = z.object({
  email: z.email('Please provide a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
})

export const authUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().optional(),
})

export const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  user: authUserSchema,
})
