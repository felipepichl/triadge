import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'

import { apiGoogleAnalyticsGetViews } from '@/api/google/get-views'
import { LineChartFinancialCategory } from '@/components/charts/line-chart-financial-category/line-chart-financial-category'
import { PieChartTransactions } from '@/components/charts/pie-chart/pie-chart'
import { CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export function Dashboard() {
  const { user, signInWithGoogle } = useAuth()

  const handleLogin = async () => {
    await signInWithGoogle()
  }

  const handleViwes = useCallback(async () => {
    await apiGoogleAnalyticsGetViews()
  }, [])

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

      <div>
        <button onClick={handleLogin}>Login with Google</button>
        <button onClick={handleViwes}>Get Youtube Viwes</button>
      </div>
    </>
  )
}
