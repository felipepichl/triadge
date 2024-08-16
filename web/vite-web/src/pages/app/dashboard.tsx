import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useTransaction } from '@/hooks/use-transaction'

export function Dashboard() {
  const { user } = useAuth()

  const { transactionByDateRangeAndType, loadTransactionByDateRangeAndType } =
    useTransaction()

  useEffect(() => {
    loadTransactionByDateRangeAndType()
  }, [loadTransactionByDateRangeAndType])

  const chartData = [
    {
      transactionType: 'income',
      value: transactionByDateRangeAndType?.balance?.income,
      fill: '#00b37e',
    },
    {
      transactionType: 'outcome',
      value: transactionByDateRangeAndType?.balance?.outcome,
      fill: '#ff0000',
    },
    {
      transactionType: 'total',
      value: transactionByDateRangeAndType?.balance?.total,
      fill: '#374151',
    },
  ]

  const chartConfig = {
    income: {
      label: 'Entrada',
      color: '#00b37e',
    },
    outcome: {
      label: 'Saída',
      color: '#ff0000',
    },
    total: {
      label: 'Total',
      color: '#374151',
    },
  } satisfies ChartConfig

  return (
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="pb-6 pt-4">Olá, {user?.name}</CardTitle>

      <Card className="mx-auto flex aspect-square max-h-[400px] flex-col">
        <CardHeader className="">
          <CardTitle>Transações</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <Pie data={chartData} dataKey="value" />
              <ChartLegend
                content={<ChartLegendContent nameKey="transactionType" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  )
}
