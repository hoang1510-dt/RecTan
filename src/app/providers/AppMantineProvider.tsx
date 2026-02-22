import { MantineProvider, createTheme } from '@mantine/core'
import type { ReactNode } from 'react'

const appTheme = createTheme({
  primaryColor: 'indigo',
  defaultRadius: 'md',
  fontFamily:
    'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
})

type AppMantineProviderProps = {
  children: ReactNode
}

export function AppMantineProvider({ children }: AppMantineProviderProps) {
  return (
    <MantineProvider defaultColorScheme="light" theme={appTheme}>
      {children}
    </MantineProvider>
  )
}
