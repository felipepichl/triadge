import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="mt-16 w-full pl-8 pr-8 pt-3">
        <Outlet />
      </div>
    </div>
  )
}
