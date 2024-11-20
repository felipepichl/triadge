import { useCallback, useEffect, useState } from 'react'
import NotFound from 'react-lottie'
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

import { apiListTotalSpentByFinancialCategory } from '@/api/list-total-spent-by-financial-category'
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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

const chartConfig = {
  visitors: {
    // label: 'Visitors',
    color: 'hsl(var(--chart-2))',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export function LineChartCategoryTransactions() {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 690)

  const [chartData, setChartData] = useState<
    { financialCategory: string; value: number }[]
  >([])

  const fetchTotalSpentByMonth = useCallback(async (monthNumber: number) => {
    const response = await apiListTotalSpentByFinancialCategory({
      type: 'outcome',
      month: Number(monthNumber),
    })

    const updatedChartData = response.totalExpensesByFinancialCategory.map(
      (item) => ({
        financialCategory: item.financialCategory.props.description,
        value: item.totalSpent,
      }),
    )

    setChartData(updatedChartData)
  }, [])

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      await fetchTotalSpentByMonth(Number(monthNumber))
    },
    [fetchTotalSpentByMonth],
  )

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1
    fetchTotalSpentByMonth(currentMonth)

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 690)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [fetchTotalSpentByMonth])

  return (
    <Card className="mb-4 flex w-full flex-col lg:mr-2 lg:h-[400px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>Transação por categorias em saídas</CardDescription>
        </CardHeader>
        <div className="flex-1 px-4 pb-4 lg:pb-0">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>
      </div>
      <Separator />

      <CardContent className="flex flex-1 flex-col items-center justify-end">
        {chartData.length === 0 ? (
          <>
            <NotFound
              options={{
                animationData: notFoundAnimation,
              }}
              height={208}
              width={208}
            />
            <CardDescription className="text-center">
              Nenhuma transação encontrada
            </CardDescription>
          </>
        ) : isWideScreen ? (
          <ChartContainer className="max-h-[250px] w-full" config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 48,
                left: 48,
                right: 48,
                bottom: 48,
              }}
            >
              <CartesianGrid vertical={true} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="value"
                    hideLabel
                  />
                }
              />
              <Line
                dataKey="value"
                type="natural"
                stroke="var(--color-visitors)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-visitors)',
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  dataKey="financialCategory"
                />
              </Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <ChartContainer className="min-h-screen w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
                top: 16,
              }}
            >
              <YAxis dataKey="value" type="category" hide />
              <XAxis dataKey="value" type="number" hide />
              {/* 
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  /> 
              */}
              <Bar
                dataKey="value"
                layout="vertical"
                fill="hsl(var(--chart-2))"
                radius={4}
              >
                <LabelList
                  dataKey="financialCategory"
                  position="insideLeft"
                  offset={8}
                  fill="white"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
