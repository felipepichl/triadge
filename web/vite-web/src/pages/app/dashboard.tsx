import { Helmet } from 'react-helmet-async'

import { useAuth } from '@/hooks/use-auth'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <Helmet title="Dashboard" />
      <h1>{user?.signInResponse.name}</h1>
    </>
  )
}
