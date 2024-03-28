// ProtectedRoute.tsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'

type PrivateRouteProps = {
  path: string
  element: React.ReactElement
}

export function ProtectedRoute({ element, ...rest }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()

  return
  {
    isAuthenticated ? (
      <Outlet element={element} {...rest} />
    ) : (
      <Navigate to="/sign-in" />
    )
  }
}
