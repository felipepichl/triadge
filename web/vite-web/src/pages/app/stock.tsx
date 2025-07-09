import { Activity, DollarSign, TrendingUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import { BarChartGeneric } from '@/components/charts/bar-chart-generic'
import { ListStock } from '@/components/list-stock'
import { NewStock } from '@/components/new-stock/new-stock'
import { SummaryProps } from '@/components/summary/summary'
import { SummaryCarousel } from '@/components/summary/summary-carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { useStock } from '@/hooks/use-stock'
import { priceFormatter } from '@/util/formatter'

const chartConfig = {
  name: {
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const chartData = [
  { name: 'January', value: 1186 },
  { name: 'February', value: 30005 },
  { name: 'March', value: 23700 },
  { name: 'April', value: 73 },
  { name: 'May', value: 209 },
  { name: 'June', value: 214 },
  { name: 'June', value: 2207 },
  { name: 'June', value: 224 },
]

export function Stock() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  const { getPortfolioQuotes, investment } = useStock()

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

  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />

      <SummaryCarousel summaries={summaries} />

      <div className="mt-8 flex flex-col lg:flex-row">
        <ListStock type="fii" />
        <div className="flex-1">
          <Card className="min-h-[574px]">
            <CardHeader>
              <CardTitle>Compisição</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className="flex flex-1 flex-col items-center justify-end">
              <BarChartGeneric data={chartData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
