import { env } from '../../../lib/env/env'
import { Button } from '../../../shared/components/ui/Button'

const PROVIDERS = [
  {
    id: 'google',
    label: 'Continue with Google',
    enabled: env.VITE_GOOGLE_LOGIN_ENABLED,
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    enabled: env.VITE_FACEBOOK_LOGIN_ENABLED,
  },
] as const

type SocialLoginButtonsProps = {
  onSuccess?: () => void
}

export function SocialLoginButtons({ onSuccess }: SocialLoginButtonsProps) {
  const enabledProviders = PROVIDERS.filter((p) => p.enabled)

  if (enabledProviders.length === 0) return null

  function handleSocialLogin(provider: string) {
    const url = `${env.VITE_API_BASE_URL}/auth/external/${provider}/start`
    window.location.href = url
    onSuccess?.()
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with</span>
        </div>
      </div>
      {enabledProviders.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin(provider.id)}
        >
          {provider.label}
        </Button>
      ))}
      </div>
  )
}
