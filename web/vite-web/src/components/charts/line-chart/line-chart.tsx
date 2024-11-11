import { Value } from '@radix-ui/react-select'
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

import {
  apiListTotalSpentByFinancialCategory,
  ListTotalSpentByFinancialCategoryResponse,
} from '@/api/list-total-spent-by-financial-category'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

// const chartData = [
//   { financialCategory: 'chrome', value: 275 },
//   { financialCategory: 'safari', value: 200 },
//   { financialCategory: 'firefox', value: 187 },
//   { financialCategory: 'edge', value: 173 },
//   { financialCategory: 'other', value: 90 },
//   { financialCategory: 'chrome', value: 275 },
//   { financialCategory: 'safari', value: 200 },
//   { financialCategory: 'firefox', value: 187 },
//   { financialCategory: 'edge', value: 173 },
//   { financialCategory: 'other', value: 90 },
//   { financialCategory: 'chrome', value: 275 },
//   { financialCategory: 'safari', value: 200 },
//   { financialCategory: 'firefox', value: 187 },
//   { financialCategory: 'edge', value: 173 },
//   { financialCategory: 'other', value: 90 },
// ]

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

  const [
    totalExpensesByFinancialCategory,
    setTotalExpensesByFinancialCategory,
  ] = useState<ListTotalSpentByFinancialCategoryResponse>()

  // const [chartData, setChartData] = useState([
  //   {
  //     // financialCategory:
  //     //   totalExpensesByFinancialCategory?.totalExpensesByFinancialCategory.map(
  //     //     (financialCategory) =>
  //     //       financialCategory.financialCategory.props.description,
  //     //   ),
  //     // value:
  //     //   totalExpensesByFinancialCategory?.totalExpensesByFinancialCategory.map(
  //     //     (value) => value.totalSpent,
  //     //   ),

  //     financialCategory: 'Test',
  //     value: 100,
  //   },
  // ])

  const [chartData, setChartData] = useState<
    { financialCategory: string; value: number }[]
  >([])

  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    const response = await apiListTotalSpentByFinancialCategory({
      type: 'outcome',
      month: Number(monthNumber),
    })

    setTotalExpensesByFinancialCategory(response)
  }, [])

  useEffect(() => {
    async function load() {
      const response = await apiListTotalSpentByFinancialCategory({
        type: 'outcome',
        month: 11,
      })

      const updatedChartData = response.totalExpensesByFinancialCategory.map(
        (item) => ({
          financialCategory: item.financialCategory.props.description,
          value: item.totalSpent,
        }),
      )

      setChartData(updatedChartData)

      // console.log(JSON.stringify(response, null, 2))
      setTotalExpensesByFinancialCategory(response)
    }

    load()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 690)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Card className="lg:min-h-[400px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>Transação por categorias em saídas</CardDescription>
        </CardHeader>
        <div className="flex-1 px-4 pb-4 lg:pb-0">
          <Select
          // onValueChange={handleMonthSelect}
          // defaultValue={String(currentMonth)}
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
      </div>
      <Separator />
      <CardContent>
        {isWideScreen ? (
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
                  // formatter={(value: keyof typeof chartConfig) =>
                  //   chartConfig[value]?.label
                  // }
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
              <YAxis
                dataKey="value"
                type="category"
                // tickLine={false}
                // tickMargin={10}
                // axisLine={false}
                // tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
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
