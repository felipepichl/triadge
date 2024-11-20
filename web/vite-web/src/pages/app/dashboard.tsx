import { Helmet } from 'react-helmet-async'

import { LineChartCategoryTransactions } from '@/components/charts/line-chart/line-chart'
import { PieChartTransactions } from '@/components/charts/pie-chart/pie-chart'
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
          <LineChartCategoryTransactions />
        </div>
      </div>
    </>
  )
}
