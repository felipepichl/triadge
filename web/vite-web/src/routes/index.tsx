import { Route, Routes as ReactRouterRoutes } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Dashboard } from '@/pages/app/dashboard'
import { Finances } from '@/pages/app/finances'
import { SignIn } from '@/pages/auth/sign-in'

import { PrivateRoute } from './private-route'

export function Routes() {
  return (
    <ReactRouterRoutes>
      <PrivateRoute path="/" element={<AppLayout />}>
        <PrivateRoute index element={<Dashboard />} />
        <PrivateRoute path="finances" element={<Finances />} />
      </PrivateRoute>

      <Route path="/sign-in" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>
    </ReactRouterRoutes>
  )
}
