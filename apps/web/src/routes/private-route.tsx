import { Navigate } from 'react-router-dom'

import { useAuth } from '@/hooks/use-auth'

interface PrivateRouteProps {
  children: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/sign-in" />
}
