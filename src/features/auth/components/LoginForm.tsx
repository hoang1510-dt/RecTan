import { useState, type FormEvent } from 'react'
import type { ApiError } from '../../../lib/api/errors'
import { Button } from '../../../shared/components/ui/Button'
import { FormError } from '../../../shared/components/ui/FormError'
import { Input } from '../../../shared/components/ui/Input'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { loginPayloadSchema } from '../schemas/auth.schema'

type LoginFormProps = {
  onSuccess?: () => void
}

type FieldErrors = {
  email?: string
  password?: string
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const loginMutation = useLoginMutation()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = loginPayloadSchema.safeParse({ email, password })

    if (!validation.success) {
      setFieldErrors({
        email: validation.error.flatten().fieldErrors.email?.[0],
        password: validation.error.flatten().fieldErrors.password?.[0],
      })
      return
    }

    setFieldErrors({})
    await loginMutation.mutateAsync(validation.data)
    onSuccess?.()
  }

  return (
    <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
      <Input
        autoComplete="email"
        error={fieldErrors.email}
        label="Email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@company.com"
        type="email"
        value={email}
      />
      <Input
        autoComplete="current-password"
        error={fieldErrors.password}
        label="Password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="********"
        type="password"
        value={password}
      />
      <FormError message={(loginMutation.error as ApiError | null)?.message} />
      <Button isLoading={loginMutation.isPending} type="submit">
        Login
      </Button>
    </form>
  )
}
