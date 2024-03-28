import { Helmet } from 'react-helmet-async'

import { useAuth } from '@/contexts/auth-context'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <Helmet title="Dashboard" />
      <h1>{user?.name}</h1>
    </>
  )
}
