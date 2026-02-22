import { useNavigate } from '@tanstack/react-router'
import { ROUTES } from '../../../shared/constants/routes'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mb-6 text-sm text-slate-500">
          Sign in to continue to your dashboard.
        </p>
        <LoginForm onSuccess={() => void navigate({ to: ROUTES.dashboard })} />
      </div>
    </div>
  )
}
