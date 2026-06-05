import { Outlet } from 'react-router-dom'

import { AutomaticSignoutAlert } from '@/features/auth/components/automatic-signout-alert'
import Header from '@/shared/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <AutomaticSignoutAlert />

      <div className="mt-16 w-full pl-8 pr-8 pt-3">
        <Outlet />
      </div>
    </div>
  )
}
