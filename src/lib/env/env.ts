import { z } from 'zod'

const boolEnv = () =>
  z
    .string()
    .optional()
    .transform((v) => v === 'true' || v === '1')

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
  VITE_PUBLIC_URL: z.url(),
  VITE_AUTH_STORAGE_KEY: z.string().min(1).default('rectan.auth'),
  VITE_GOOGLE_LOGIN_ENABLED: boolEnv().default(false),
  VITE_FACEBOOK_LOGIN_ENABLED: boolEnv().default(
    false,
  ),
})

const parsedEnv = envSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  VITE_AUTH_STORAGE_KEY: import.meta.env.VITE_AUTH_STORAGE_KEY,
  VITE_GOOGLE_LOGIN_ENABLED: import.meta.env.VITE_GOOGLE_LOGIN_ENABLED,
  VITE_FACEBOOK_LOGIN_ENABLED: import.meta.env.VITE_FACEBOOK_LOGIN_ENABLED,
})

if (!parsedEnv.success) {
  const formatted = parsedEnv.error.flatten().fieldErrors
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(formatted, null, 2)}`,
  )
}

export const env = parsedEnv.data
