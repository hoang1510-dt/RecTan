import type { AxiosError, AxiosRequestConfig, Method } from 'axios'
import { apiClient } from './axios'

export async function customInstance<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const requestConfig: AxiosRequestConfig = {
    url,
    method: (options?.method as Method | undefined) ?? 'GET',
    headers: options?.headers as AxiosRequestConfig['headers'],
    data: options?.body,
    signal: options?.signal ?? undefined,
  }

  const response = await apiClient.request<T>(requestConfig)
  return response.data
}

export type ErrorType<Error> = AxiosError<Error>
