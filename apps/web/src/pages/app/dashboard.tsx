import { Helmet } from 'react-helmet-async'

import { LineChartFinancialCategory } from '@/components/charts/line-chart-financial-category'
import { PieChartTransactions } from '@/components/charts/pie-chart'
import { CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

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
