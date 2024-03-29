import { createBrowserRouter, Navigate } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'
/** Layouts */
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
/** Pages */
import { Dashboard } from '@/pages/app/dashboard'
import { Finances } from '@/pages/app/finances'
import { SignIn } from '@/pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/finances', element: <Finances /> },
    ],
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
