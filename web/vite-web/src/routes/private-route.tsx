import React from 'react'
import { Navigate, Route, RouteProps } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'

type PrivateRouteProps = RouteProps & {
  element: React.ReactNode
}

export function PrivateRoute({ element, ...rest }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/sign-in" />
  )
}
