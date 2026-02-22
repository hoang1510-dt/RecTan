import type { AxiosInstance } from 'axios'
import { authStorage } from '../utils/storage'
import { normalizeApiError } from './errors'

let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  unauthorizedHandler = handler
}

export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    const token = authStorage.getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      const apiError = normalizeApiError(error)

      if (apiError.status === 401) {
        authStorage.clearSession()
        unauthorizedHandler?.()
      }

      return Promise.reject(apiError)
    },
  )
}
