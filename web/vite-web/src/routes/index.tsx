import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'
/** Layouts */
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
/** Pages */
import { Dashboard } from '@/pages/app/dashboard'
import { Finances } from '@/pages/app/finances'
import { SignIn } from '@/pages/auth/sign-in'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/sign-in" />
}

export default PrivateRoute

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/finances',
        element: (
          <PrivateRoute>
            <Finances />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
