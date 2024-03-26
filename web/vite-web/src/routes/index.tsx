import { createBrowserRouter } from 'react-router-dom'

import { AuthProvider } from '@/contexts/auth-context'
import AppLayout from '@/pages/_layouts/app'
import AuthLayout from '@/pages/_layouts/auth'
import Dashboard from '@/pages/app/dashboard'
import { Finances } from '@/pages/app/finances'
import SignIn from '@/pages/auth/sign-in'

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
