import { Activity, DollarSign, TrendingUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { GenericBarChart } from '@/components/charts/generic-bar-chart'
import { GenericBarChartProps } from '@/components/charts/generic-bar-chart/dtos/generic-bar-chart-dto'
import { GenericPieChart } from '@/components/charts/generic-pie-chart'
import { ListStock } from '@/components/list-stock'
import { NewStock } from '@/components/new-stock/new-stock'
import { SummaryProps } from '@/components/summary/summary'
import { SummaryCarousel } from '@/components/summary/summary-carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useStock } from '@/hooks/use-stock'
import { priceFormatter } from '@/util/formatter'

export function Stock() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])
  const [chartData, setChartData] = useState<GenericBarChartProps['data']>([])

  const {
    getPortfolioQuotes,
    investment,
    portfolio: portfolioResponse,
  } = useStock()

  const portfolioQuotes = useCallback(async () => {
    await getPortfolioQuotes('fii')
  }, [getPortfolioQuotes])

  useEffect(() => {
    portfolioQuotes()
  }, [portfolioQuotes])

  useEffect(() => {
    const summariesResume: SummaryProps[] = [
      {
        color: 'default',
        description: 'Total Investido',
        icon: DollarSign,
        iconColor: '#00b37e',
        value: priceFormatter.format(investment?.totalInvested ?? 0),
      },
      {
        color: 'default',
        description: 'Cotação Atual',
        icon: Activity,
        iconColor: '#ff0000',
        value: priceFormatter.format(investment?.currentValue ?? 0),
      },
      {
        color: 'green',
        description: 'Posição',
        icon: TrendingUpDown,
        iconColor: '#fff',
        value: 'R$ 250,00',
      },
    ]

    setSummaries(summariesResume)
  }, [investment])

  useEffect(() => {
    const mappedData = (portfolioResponse?.portfolio ?? []).map((item) => ({
      name: item.stock.symbol,
      value: item.currentValue,
    }))

    setChartData(mappedData)
  }, [portfolioResponse])

  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />

      <SummaryCarousel summaries={summaries} />

      <div className="mt-8 flex flex-col lg:flex-row">
        <ListStock type="fii" />
        <div className="flex-1">
          <Card className="flex flex-col md:min-h-[574px]">
            <CardHeader>
              <CardTitle>Compisição</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="flex flex-1 items-center justify-center">
              <GenericPieChart data={chartData} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-4 mt-4 flex-1 lg:mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Alocação Monetária</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <GenericBarChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
