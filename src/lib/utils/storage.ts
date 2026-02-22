import { z } from 'zod'
import { env } from '../env/env'

const accessTokenKey = `${env.VITE_AUTH_STORAGE_KEY}.token`
const userKey = `${env.VITE_AUTH_STORAGE_KEY}.user`

const authUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().optional(),
})

export type StoredAuthUser = z.infer<typeof authUserSchema>

function readStorageValue<T>(
  key: string,
  parser: (value: unknown) => T,
): T | null {
  const raw = localStorage.getItem(key)

  if (!raw) {
    return null
  }

  try {
    return parser(JSON.parse(raw))
  } catch {
    localStorage.removeItem(key)
    return null
  }
}

export const authStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(accessTokenKey)
  },
  setAccessToken(token: string): void {
    localStorage.setItem(accessTokenKey, token)
  },
  clearAccessToken(): void {
    localStorage.removeItem(accessTokenKey)
  },
  getUser(): StoredAuthUser | null {
    return readStorageValue(userKey, (value) => authUserSchema.parse(value))
  },
  setUser(user: StoredAuthUser): void {
    localStorage.setItem(userKey, JSON.stringify(user))
  },
  clearUser(): void {
    localStorage.removeItem(userKey)
  },
  clearSession(): void {
    this.clearAccessToken()
    this.clearUser()
  },
}
