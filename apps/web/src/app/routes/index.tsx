import { createBrowserRouter } from 'react-router-dom'

/** Layouts */
import { AppLayout } from '@/app/layouts/app'
import { AuthLayout } from '@/app/layouts/auth'
import { Dashboard } from '@/app/pages/dashboard'
/** Private Pages */
import { AccountPayable } from '@/features/accounts-payable/pages/account-payable'
/** Pages */
import { SignIn } from '@/features/auth/pages/sign-in'
import { Stock } from '@/features/stock/pages/stock'
import { Finances } from '@/features/transactions/pages/finances'

import { PrivateRoute } from './private-route'

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/finances',
        element: <Finances />,
      },
      {
        path: '/account-payable',
        element: <AccountPayable />,
      },
      {
        path: '/stock',
        element: <Stock />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
