import { Helmet } from 'react-helmet-async'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { LineChartFinancialCategory } from '@/features/financial-categories/components/line-chart-financial-category'
import { PieChartTransactions } from '@/features/transactions/components/pie-chart'
import { CardTitle } from '@/shared/components/ui/card'

export function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="pb-6 pt-4">Olá, {user?.name}</CardTitle>

      <div className="flex flex-col lg:flex-row">
        <PieChartTransactions />
        <div className="flex-1">
          <LineChartFinancialCategory type="transaction" />
        </div>
      </div>
    </>
  )
}
