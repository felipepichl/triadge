import { getMonth } from 'date-fns'
import { useState } from 'react'
import { Pie, PieChart } from 'recharts'

import { useTransactionsByMonth } from '@/features/transactions/hooks/use-transactions-by-month'
import { MonthSelect } from '@/shared/components/month-select'
import { NotFound } from '@/shared/components/not-found'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/shared/components/ui/chart'
import { Separator } from '@/shared/components/ui/separator'
import { THEME } from '@/shared/styles/theme/colors'

const chartConfig = {
  income: {
    label: 'Entrada',
    color: THEME.COLORS.INCOME,
  },
  outcome: {
    label: 'Saída',
    color: THEME.COLORS.OUTCOME,
  },
} satisfies ChartConfig

export function PieChartTransactions() {
  const currentMonth = getMonth(new Date()) + 1
  const [month, setMonth] = useState(currentMonth)

  const { data } = useTransactionsByMonth(month)

  const hasTransactions = data && data.transactions.length > 0

  const chartData = hasTransactions
    ? [
        {
          transactionType: 'income',
          value: data.balance?.income || 0,
          fill: THEME.COLORS.INCOME,
        },
        {
          transactionType: 'outcome',
          value: data.balance?.outcome || 0,
          fill: THEME.COLORS.OUTCOME,
        },
      ]
    : []

  return (
    <Card className="mb-4 flex h-[400px] w-full flex-col lg:mr-2 lg:w-[480px]">
      <CardHeader>
        <CardTitle>Transações</CardTitle>
        <CardDescription>Por entrada e sáida</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="mt-4 w-full">
          <MonthSelect
            onMonthSelect={(monthNumber) => setMonth(Number(monthNumber))}
          />
        </div>
        {chartData.length === 0 ? (
          <NotFound />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-3"
          >
            <PieChart>
              <Pie data={chartData} dataKey="value" />
              <ChartLegend
                content={<ChartLegendContent nameKey="transactionType" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
