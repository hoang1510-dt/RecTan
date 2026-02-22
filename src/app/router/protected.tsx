import { redirect } from '@tanstack/react-router'
import { authStorage } from '../../lib/utils/storage'
import { ROUTES } from '../../shared/constants/routes'

export function requireAuthenticatedUser() {
  const token = authStorage.getAccessToken()

  if (!token) {
    throw redirect({ to: ROUTES.login })
  }
}
