import { createBrowserRouter } from 'react-router-dom'

import { AccountsPayableProvider } from '@/contexts/app/accounts-payable-context'
/** Layouts */
import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
/** Private Pages */
import { AccountPayable } from '@/pages/app/account-payable'
import { Dashboard } from '@/pages/app/dashboard'
import { Finances } from '@/pages/app/finances'
import { Stock } from '@/pages/app/stock'
/** Pages */
import { SignIn } from '@/pages/auth/sign-in'

import { PrivateRoute } from './private-route'

export const router = createBrowserRouter([
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
        element: (
          <AccountsPayableProvider>
            <AccountPayable />
          </AccountsPayableProvider>
        ),
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
