import { Activity, DollarSign, TrendingUpDown } from 'lucide-react'
import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'

import { ListStock } from '@/features/stock/components/list-stock'
import { NewStock } from '@/features/stock/components/new-stock/new-stock'
import { useInvestment } from '@/features/stock/hooks/use-investment'
import { usePortfolio } from '@/features/stock/hooks/use-portfolio'
import { GenericBarChart } from '@/shared/components/charts/generic-bar-chart'
import { GenericPieChart } from '@/shared/components/charts/generic-pie-chart'
import { SummaryProps } from '@/shared/components/summary/summary'
import { SummaryCarousel } from '@/shared/components/summary/summary-carousel'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { priceFormatter } from '@/shared/util/formatter'

export function Stock() {
  const { data: investment, isLoading: isLoadingInvestment } = useInvestment()
  const { data: portfolioResponse } = usePortfolio('fii')

  const summaries = useMemo<SummaryProps[]>(
    () => [
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
        color: (investment?.position ?? 0) < 0 ? 'rose' : 'green',
        description: 'Posição',
        icon: TrendingUpDown,
        iconColor: '#fff',
        value: priceFormatter.format(investment?.position ?? 0),
      },
    ],
    [investment],
  )

  const chartData = useMemo(
    () =>
      (portfolioResponse?.portfolio ?? []).map((item) => ({
        name: item.stock.symbol,
        value: item.currentValue,
      })),
    [portfolioResponse],
  )

  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />

      <SummaryCarousel summaries={summaries} isLoading={isLoadingInvestment} />

      <div className="mt-8 flex flex-col lg:flex-row">
        <ListStock type="fii" />
        <div className="flex-1">
          <Card className="flex max-h-[574px] flex-col md:min-h-[574px]">
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
