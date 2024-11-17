import { getMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NotFound from 'react-lottie'
import { Pie, PieChart } from 'recharts'

import { apiListByMonth } from '@/api/list-by-month'
import notFoundAnimation from '@/assets/not-found-new.json'
import { LineChartCategoryTransactions } from '@/components/charts/line-chart/line-chart'
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
import { useAuth } from '@/hooks/use-auth'
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

export function Dashboard() {
  const { user } = useAuth()

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
    <>
      <Helmet title="Dashboard" />
      <CardTitle className="pb-6 pt-4">Olá, {user?.name}</CardTitle>

      <div className="flex flex-col lg:flex-row">
        <Card className="mb-4 flex max-h-[400px] min-h-[400px] flex-col sm:w-full md:w-full lg:mr-2 lg:w-[480px]">
          <CardHeader>
            <CardTitle>Transações</CardTitle>
            <CardDescription>Por entrada e sáida</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 justify-end">
            <div className="mt-4">
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

        <div className="flex-1">
          <LineChartCategoryTransactions />
        </div>
      </div>
    </>
  )
}
