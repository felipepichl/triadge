import { Helmet } from 'react-helmet-async'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="p-4">Olá, {user?.name}</CardTitle>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Transações</CardTitle>
          <CardDescription>Augosto - Setembro 2024 </CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}
