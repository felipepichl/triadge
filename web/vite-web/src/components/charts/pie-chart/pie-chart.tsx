import { getMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import NotFound from 'react-lottie'
import { Pie, PieChart } from 'recharts'

import { apiListByMonth } from '@/api/list-by-month'
import notFoundAnimation from '@/assets/not-found-new.json'
import { MonthSelect } from '@/components/month-select/month-select'
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
import { THEME } from '@/styles/theme/colors'

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
  const [chartData, setChartData] = useState([
    {
      transactionType: 'income',
      value: 0,
      fill: THEME.COLORS.INCOME,
    },
    {
      transactionType: 'outcome',
      value: 0,
      fill: THEME.COLORS.OUTCOME,
    },
  ])

  const fetchListByMonth = useCallback(async (monthNumber: number) => {
    const response = await apiListByMonth({ month: Number(monthNumber) })

    const { balance } = response

    setChartData([
      {
        transactionType: 'income',
        value: balance?.income || 0,
        fill: THEME.COLORS.INCOME,
      },
      {
        transactionType: 'outcome',
        value: balance?.outcome || 0,
        fill: THEME.COLORS.OUTCOME,
      },
    ])
  }, [])

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      await fetchListByMonth(Number(monthNumber))
    },
    [fetchListByMonth],
  )

  useEffect(() => {
    const currentMonth = getMonth(new Date()) + 1
    fetchListByMonth(currentMonth)
  }, [fetchListByMonth])

  return (
    <Card className="mb-4 flex h-[400px] w-full flex-col lg:mr-2 lg:w-[480px]">
      <CardHeader>
        <CardTitle>Transações</CardTitle>
        <CardDescription>Por entrada e sáida</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="mt-4 w-full">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>
        {chartData[0].value === 0 ? (
          <>
            <NotFound
              options={{
                animationData: notFoundAnimation,
              }}
              height={200}
              width={200}
            />
            <CardDescription className="pb-3 text-center">
              Nenhuma transação encontrada
            </CardDescription>
          </>
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
