import { createBrowserRouter } from 'react-router-dom'

import { AccountsPayableProvider } from '@/features/accounts-payable/contexts/accounts-payable-context'
import { StockProvider } from '@/features/stock/contexts/stock-context'
/** Layouts */
import { AppLayout } from '@/app/layouts/app'
import { AuthLayout } from '@/app/layouts/auth'
/** Private Pages */
import { AccountPayable } from '@/features/accounts-payable/pages/account-payable'
import { Dashboard } from '@/app/pages/dashboard'
import { Finances } from '@/features/transactions/pages/finances'
import { Stock } from '@/features/stock/pages/stock'
/** Pages */
import { SignIn } from '@/features/auth/pages/sign-in'

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
        element: (
          <StockProvider>
            <Stock />
          </StockProvider>
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
