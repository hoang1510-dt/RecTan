import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { queryClient } from '../../lib/query/queryClient'

type QueryProviderProps = {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryErrorResetBoundary>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryErrorResetBoundary>
  )
}
