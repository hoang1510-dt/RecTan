/* eslint-disable react-refresh/only-export-components */
import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  AuthUser,
  LoginResponse,
} from '../../features/auth/types/auth.types'
import { setUnauthorizedHandler } from '../../lib/api/interceptors'
import { authStorage } from '../../lib/utils/storage'

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (session: LoginResponse) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(authStorage.getAccessToken())
  const [user, setUser] = useState<AuthUser | null>(authStorage.getUser())

  const login = useCallback((session: LoginResponse) => {
    setToken(session.accessToken)
    setUser(session.user)
    authStorage.setAccessToken(session.accessToken)
    authStorage.setUser(session.user)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    authStorage.clearSession()
    queryClient.clear()
  }, [queryClient])

  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => {
      setUnauthorizedHandler(null)
    }
  }, [logout])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token, user],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
