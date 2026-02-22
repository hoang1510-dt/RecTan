import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_AUTH_STORAGE_KEY: z.string().min(1).default('rectan.auth'),
})

const parsedEnv = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_AUTH_STORAGE_KEY: import.meta.env.VITE_AUTH_STORAGE_KEY,
})

if (!parsedEnv.success) {
  const formatted = parsedEnv.error.flatten().fieldErrors
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(formatted, null, 2)}`,
  )
}

export const env = parsedEnv.data
