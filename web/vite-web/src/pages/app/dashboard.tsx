import { Helmet } from 'react-helmet-async'

import { useAuth } from '@/hooks/use-auth'
import { useTransaction } from '@/hooks/use-transaction'

export function Dashboard() {
  const { user } = useAuth()
  const { transactions: t } = useTransaction()

  console.log(t)

  return (
    <>
      <Helmet title="Dashboard" />
      <h1>{user?.name}</h1>
    </>
  )
}
