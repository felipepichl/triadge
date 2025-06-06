// import { isAxiosError } from 'axios'
// import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { AutomaticSignoutAlert } from '@/components/automatic-signout-alert'
import Header from '@/components/header'
// import { api } from '@/lib/axios'

export function AppLayout() {
  // useEffect(() => {
  //   const interceptorId = api.interceptors.response.use(
  //     (reponse) => reponse,
  //     (error) => {
  //       if (isAxiosError(error)) {
  //         const status = error.response?.status
  //         const code = error.response?.data.code

  //         console.log(`STATUS =>`, status)

  //         console.log(`CODE =>`, error.response?.data.message)
  //       }
  //     },
  //   )

  //   return () => {
  //     api.interceptors.response.eject(interceptorId)
  //   }
  // }, [navigate])

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
