import {
  MutationCache,
  QueryCache,
  QueryClient,
  type DefaultOptions,
} from '@tanstack/react-query'
import { handleGlobalApiError, normalizeApiError } from '../api/errors'

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      const apiError = normalizeApiError(error)

      // Retry only transient/server errors.
      if (apiError.status >= 400 && apiError.status < 500 && apiError.status !== 429) {
        return false
      }

      return failureCount < 2
    },
  },
  mutations: {
    retry: 0,
  },
}

export const queryClient = new QueryClient({
  defaultOptions,
  queryCache: new QueryCache({
    onError: (error) => {
      handleGlobalApiError(normalizeApiError(error))
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleGlobalApiError(normalizeApiError(error))
    },
  }),
})
