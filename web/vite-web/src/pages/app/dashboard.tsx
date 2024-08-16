import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useTransaction } from '@/hooks/use-transaction'

const chartConfig = {
  transactions: {
    label: 'Transactions',
  },
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

export function Dashboard() {
  const { user } = useAuth()

  const { transactionByDateRangeAndType, loadTransactionByDateRangeAndType } =
    useTransaction()

  useEffect(() => {
    loadTransactionByDateRangeAndType()
  }, [loadTransactionByDateRangeAndType])

  const chartData = [
    {
      type: 'income',
      value: transactionByDateRangeAndType?.balance?.income,
      fill: '#00b37e',
    },
    {
      type: 'outcome',
      value: transactionByDateRangeAndType?.balance?.outcome,
      fill: '#ff0000',
    },
    {
      type: 'total',
      value: transactionByDateRangeAndType?.balance?.total,
      fill: '#374151',
    },
  ]

  return (
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="p-4">Olá, {user?.name}</CardTitle>

      <Card className="mx-auto flex aspect-square max-h-[400px] flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Transações</CardTitle>
          <CardDescription>Agosto - Setembro 2024 </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  )
}
