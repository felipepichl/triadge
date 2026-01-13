import { NotificationNavigationHandler } from '@components/NotificationNavigationHandler'
import { useAuth } from '@/hooks/useAuth'

// import { AppRoutes } from './app.routes'
import { StackRoutes } from './app/stack.routes'
import { AuthRoutes } from './auth.routes'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()

  // TODO: Add loading state while checking authentication
  // For now, we'll assume authentication check is synchronous

  if (isAuthenticated) {
    return (
      <>
        <StackRoutes />
        <NotificationNavigationHandler />
      </>
    )
  }

  return <AuthRoutes />
}
