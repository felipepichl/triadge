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

export function Dashboard() {
  const { user } = useAuth()

  const currentMonth = getMonth(new Date()) + 1
  const { transactionByDateRangeAndType, loadTransactionByDateRangeAndType } =
    useTransaction()

  const [chartData, setChartData] = useState([
    {
      transactionType: 'income',
      value: transactionByDateRangeAndType?.balance?.income || 0,
      fill: '#00b37e',
    },
    {
      transactionType: 'outcome',
      value: transactionByDateRangeAndType?.balance?.outcome || 0,
      fill: '#ff0000',
    },
  ])

  // const chartData = [
  //   {
  //     transactionType: 'income',
  //     value: transactionByDateRangeAndType?.balance?.income,
  //     fill: '#00b37e',
  //   },
  //   {
  //     transactionType: 'outcome',
  //     value: transactionByDateRangeAndType?.balance?.outcome,
  //     fill: '#ff0000',
  //   },
  // ]

  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    const response = await apiListByMonth({ month: Number(monthNumber) })

    const { balance } = response

    setChartData([
      {
        transactionType: 'income',
        value: balance?.income || 0,
        fill: '#00b37e',
      },
      {
        transactionType: 'outcome',
        value: balance?.outcome || 0,
        fill: '#ff0000',
      },
    ])
  }, [])

  useEffect(() => {
    loadTransactionByDateRangeAndType()
  }, [loadTransactionByDateRangeAndType])

  useEffect(() => {
    const income = transactionByDateRangeAndType?.balance?.income || 0
    const outcome = transactionByDateRangeAndType?.balance?.outcome || 0

    console.log('here')

    // Apenas atualize o estado se os valores realmente mudaram
    if (income !== chartData[0].value || outcome !== chartData[1].value) {
      setChartData([
        {
          transactionType: 'income',
          value: income,
          fill: '#00b37e',
        },
        {
          transactionType: 'outcome',
          value: outcome,
          fill: '#ff0000',
        },
      ])
    }
  }, [transactionByDateRangeAndType, chartData])

  const chartConfig = {
    income: {
      label: 'Entrada',
      color: '#00b37e',
    },
    outcome: {
      label: 'Saída',
      color: '#ff0000',
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
                  <SelectItem value="1">Janeiro</SelectItem>
                  <SelectItem value="2">Fevereiro</SelectItem>
                  <SelectItem value="3">Março</SelectItem>
                  <SelectItem value="4">Abril</SelectItem>
                  <SelectItem value="5">Maio</SelectItem>
                  <SelectItem value="6">Junho</SelectItem>
                  <SelectItem value="7">Julho</SelectItem>
                  <SelectItem value="8">Agosto</SelectItem>
                  <SelectItem value="9">Setembro</SelectItem>
                  <SelectItem value="10">Outubro</SelectItem>
                  <SelectItem value="11">Novembro</SelectItem>
                  <SelectItem value="12">Dezembro</SelectItem>
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
