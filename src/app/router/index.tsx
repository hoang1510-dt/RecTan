/* eslint-disable react-refresh/only-export-components */
import {
  Navigate,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { AuthCallbackPage } from '../../features/auth/pages/AuthCallbackPage'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { authStorage } from '../../lib/utils/storage'
import { AppShell } from '../../shared/components/layout/AppShell'
import { Button } from '../../shared/components/ui/Button'
import { ROUTES } from '../../shared/constants/routes'
import { useAuth } from '../../shared/hooks/useAuth'
import { requireAuthenticatedUser } from './protected'

function RootLayout() {
  return <Outlet />
}

function ProtectedLayout() {
  const auth = useAuth()

  return (
    <AppShell
      action={
        <Button className="w-auto px-3 py-1.5 text-xs" onClick={auth.logout}>
          Logout
        </Button>
      }
      title="RecTan"
    >
      <Outlet />
    </AppShell>
  )
}

function DashboardPage() {
  const auth = useAuth()

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
      <p className="text-sm text-slate-600">
        You are signed in as <span className="font-semibold">{auth.user?.email}</span>.
      </p>
    </section>
  )
}

function HomeRedirect() {
  const token = authStorage.getAccessToken()
  return <Navigate to={token ? ROUTES.dashboard : ROUTES.login} />
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home,
  component: HomeRedirect,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.login,
  beforeLoad: () => {
    if (authStorage.getAccessToken()) {
      throw redirect({ to: ROUTES.dashboard })
    }
  },
  component: LoginPage,
})

const authCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.authCallback,
  component: AuthCallbackPage,
})

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_authenticated',
  beforeLoad: () => requireAuthenticatedUser(),
  component: ProtectedLayout,
})

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: ROUTES.dashboard,
  component: DashboardPage,
})

export const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  authCallbackRoute,
  authenticatedRoute.addChildren([dashboardRoute]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-slate-500">
      Page not found.
    </div>
  ),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
