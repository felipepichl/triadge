import { useState } from 'react'
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
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { Separator } from '@/shared/components/ui/separator'
import { useTotalSpent } from '@/features/financial-categories/hooks/use-total-spent'
import { useIsWideScreen } from '@/shared/hooks/use-is-wide-screen'
import { priceFormatter } from '@/shared/util/formatter'

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
  const isWideScreen = useIsWideScreen()
  const currentMonth = new Date().getMonth() + 1
  const [month, setMonth] = useState(currentMonth)

  const { data: chartData = [] } = useTotalSpent(type, month)

  return (
    <Card className="mb-4 flex w-full flex-col lg:mr-2 lg:h-[400px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>{descriptions[type]}</CardDescription>
        </CardHeader>
        <div className="flex-1 px-4 pb-4 lg:pb-0">
          <MonthSelect
            onMonthSelect={(monthNumber) => setMonth(Number(monthNumber))}
          />
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
