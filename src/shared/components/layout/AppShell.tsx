import type { ReactNode } from 'react'

type AppShellProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function AppShell({ title, action, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          {action}
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}
