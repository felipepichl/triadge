import { getMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Pie, PieChart } from 'recharts'

import { apiListByMonth } from '@/api/list-by-month'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth'
import { useTransaction } from '@/hooks/use-transaction'
import { THEME } from '@/styles/theme/colors'

export function Dashboard() {
  const { user } = useAuth()

  const currentMonth = getMonth(new Date()) + 1
  const { transactionByDateRangeAndType, loadTransactionByDateRangeAndType } =
    useTransaction()

  const [chartData, setChartData] = useState([
    {
      transactionType: 'income',
      value: transactionByDateRangeAndType?.balance?.income || 0,
      fill: THEME.COLORS.INCOME,
    },
    {
      transactionType: 'outcome',
      value: transactionByDateRangeAndType?.balance?.outcome || 0,
      fill: THEME.COLORS.OUTCOME,
    },
  ])

  const handleMonthSelect = useCallback(async (monthNumber: string) => {
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

  useEffect(() => {
    loadTransactionByDateRangeAndType()
  }, [loadTransactionByDateRangeAndType])

  useEffect(() => {
    const income = transactionByDateRangeAndType?.balance?.income || 0
    const outcome = transactionByDateRangeAndType?.balance?.outcome || 0

    setChartData((prevChartData) => {
      if (
        income !== prevChartData[0].value ||
        outcome !== prevChartData[1].value
      ) {
        return [
          {
            transactionType: 'income',
            value: income,
            fill: THEME.COLORS.INCOME,
          },
          {
            transactionType: 'outcome',
            value: outcome,
            fill: THEME.COLORS.OUTCOME,
          },
        ]
      }
      return prevChartData
    })
  }, [transactionByDateRangeAndType])

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
          <div className="mt-4">
            <Select
              onValueChange={handleMonthSelect}
              defaultValue={String(currentMonth)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[...Array(12).keys()].map((i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {new Date(0, i).toLocaleString('pt-BR', {
                        month: 'long',
                      })}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
