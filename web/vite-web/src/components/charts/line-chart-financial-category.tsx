import { useCallback, useEffect, useState } from 'react'
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

import { apiListTotalSpentByFinancialCategory } from '@/api/financial-category/list-total-spent-by-financial-category'
import { apiListTotalSpentToFixedAccountPayable } from '@/api/financial-category/list-total-spent-to-fixed-account-payable'
import { apiListTotalSpentToUnfixedAccountPayable } from '@/api/financial-category/list-total-spent-to-unfixed-account-payable'
import { MonthSelect } from '@/components/month-select'
import { NotFound } from '@/components/not-found'
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
import { priceFormatter } from '@/util/formatter'

const chartConfig = {
  financialCategory: {
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const descriptions = {
  fixedAccountPayable: 'Gastos fixos de saída',
  unfixedAccountPayable: 'Gastos variáveis de saída',
  transaction: 'Transação de saídas',
}
type LineChartFinancialCategoryProps = {
  type: 'transaction' | 'fixedAccountPayable' | 'unfixedAccountPayable'
}

export function LineChartFinancialCategory({
  type,
}: LineChartFinancialCategoryProps) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 690)

  const [chartData, setChartData] = useState<
    { financialCategory: string; value: number }[]
  >([])

  const listTotalSpent = useCallback(
    async (monthNumber: number) => {
      switch (type) {
        case 'transaction':
          return await apiListTotalSpentByFinancialCategory({
            type: 'outcome',
            month: Number(monthNumber),
          })
        case 'fixedAccountPayable':
          return await apiListTotalSpentToFixedAccountPayable({
            month: Number(monthNumber),
          })
        case 'unfixedAccountPayable':
          return await apiListTotalSpentToUnfixedAccountPayable({
            month: Number(monthNumber),
          })
        default:
          throw new Error('Tipo inválido')
      }
    },
    [type],
  )

  const fetchTotalSpent = useCallback(
    async (monthNumber: number) => {
      const { totalExpensesByFinancialCategory } =
        await listTotalSpent(monthNumber)

      const updatedChartData = totalExpensesByFinancialCategory.map((item) => ({
        financialCategory: item.financialCategory.props.description,
        value: item.totalSpent,
      }))

      setChartData(updatedChartData)
    },
    [listTotalSpent],
  )

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      await fetchTotalSpent(Number(monthNumber))
    },
    [fetchTotalSpent],
  )

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1
    fetchTotalSpent(currentMonth)

    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 690)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [fetchTotalSpent])

  return (
    <Card className="mb-4 flex w-full flex-col lg:mr-2 lg:h-[400px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>{descriptions[type]}</CardDescription>
        </CardHeader>
        <div className="flex-1 px-4 pb-4 lg:pb-0">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>
      </div>
      <Separator />

      <CardContent className="flex flex-1 flex-col items-center justify-end">
        {chartData.length === 0 ? (
          <NotFound />
        ) : isWideScreen ? (
          <ChartContainer className="max-h-[250px] w-full" config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 46,
                left: 52,
                right: 52,
                bottom: 46,
              }}
            >
              <CartesianGrid vertical={true} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="value"
                    formatter={(value) => {
                      const numericValue = Number(value)
                      return isNaN(numericValue)
                        ? '-'
                        : priceFormatter.format(numericValue)
                    }}
                  />
                }
              />
              <Line
                dataKey="value"
                type="natural"
                stroke="var(--color-financialCategory)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-financialCategory)',
                }}
                activeDot={{
                  r: 3,
                }}
              >
                <LabelList
                  position="insideBottomLeft"
                  angle={-20}
                  className="fill-foreground p-2"
                  fontSize={12}
                  dataKey="financialCategory"
                />
              </Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <ChartContainer
            className="w-full"
            config={chartConfig}
            style={{
              height: Math.min(Math.max(chartData.length * 48 + 32, 130), 600),
            }}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ top: 18 }}
            >
              <CartesianGrid horizontal={false} />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="value"
                    hideLabel
                    formatter={(value) => {
                      const numericValue = Number(value)
                      return isNaN(numericValue)
                        ? '-'
                        : priceFormatter.format(numericValue)
                    }}
                  />
                }
              />

              <YAxis dataKey="value" type="category" hide />
              <XAxis dataKey="value" type="number" hide />

              <Bar
                dataKey="value"
                layout="vertical"
                fill="hsl(var(--chart-2))"
                radius={4}
              >
                <LabelList
                  dataKey="financialCategory"
                  position="insideLeft"
                  className="fill-foreground"
                  fontSize={12}
                  width={window.innerWidth}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
