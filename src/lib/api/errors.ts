import axios from 'axios'

export type ApiError = {
  message: string
  status: number
  code?: string
  details?: unknown
}

export function normalizeApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: 'Unexpected application error.',
      status: 0,
    }
  }

  const status = error.response?.status ?? 0
  const data = error.response?.data as
    | { message?: string; code?: string; details?: unknown }
    | undefined

  return {
    status,
    message: data?.message ?? error.message ?? 'Request failed.',
    code: data?.code,
    details: data?.details,
  }
}

export function handleGlobalApiError(error: ApiError): void {
  if (import.meta.env.DEV) {
    console.error('[API Error]', error)
  }
}
