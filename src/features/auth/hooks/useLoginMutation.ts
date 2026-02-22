import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../../../shared/hooks/useAuth'
import { login } from '../api/login'

export function useLoginMutation() {
  const auth = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      auth.login(session)
    },
  })
}
