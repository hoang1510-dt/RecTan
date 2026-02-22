import { AppMantineProvider } from './AppMantineProvider'
import { AuthProvider } from './AuthProvider'
import { QueryProvider } from './QueryProvider'
import { RouterProvider } from './RouterProvider'

export function AppProviders() {
  return (
    <AppMantineProvider>
      <QueryProvider>
        <AuthProvider>
          <RouterProvider />
        </AuthProvider>
      </QueryProvider>
    </AppMantineProvider>
  )
}
