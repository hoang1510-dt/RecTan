import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../../shared/hooks/useAuth'
import { ROUTES } from '../../../shared/constants/routes'

function parseTokensFromUrl(): {
  accessToken: string
  userId?: string
  email?: string
  displayName?: string
} | null {
  const hash = window.location.hash.slice(1)
  const search = window.location.search
  const params = new URLSearchParams(hash || search)

  const accessToken =
    params.get('access_token') ?? params.get('accessToken') ?? params.get('token')
  if (!accessToken) return null

  return {
    accessToken,
    userId: params.get('user_id') ?? params.get('userId') ?? undefined,
    email: params.get('email') ?? undefined,
    displayName: params.get('display_name') ?? params.get('displayName') ?? undefined,
  }
}

export function AuthCallbackPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const tokens = parseTokensFromUrl()
    if (!tokens) {
      setError('No authentication token received.')
      return
    }

    const user = {
      id: tokens.userId ?? '',
      email: tokens.email ?? '',
      name: tokens.displayName,
    }

    auth.login({
      accessToken: tokens.accessToken,
      user,
    })

    window.history.replaceState({}, document.title, ROUTES.login)
    void navigate({ to: ROUTES.dashboard })
  }, [auth, navigate])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
          <a
            href={ROUTES.login}
            className="mt-4 inline-block text-sm text-slate-600 underline hover:text-slate-900"
          >
            Back to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-sm text-slate-600">Signing you in...</p>
      </div>
    </div>
  )
}
