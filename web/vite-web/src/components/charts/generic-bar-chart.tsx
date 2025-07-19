import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { priceFormatter } from '@/util/formatter'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

export type GenericBarChartProps = {
  data:
    | {
        name: string
        value: number
      }[]
    | undefined
}

export function GenericBarChart({ data }: GenericBarChartProps) {
  const [internalData, setInternalData] = useState<typeof data>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalData(data)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <ChartContainer className="max-h-96 w-full" config={{}}>
      <BarChart
        accessibilityLayer
        data={internalData}
        margin={{
          top: 46,
          left: 36,
          right: 36,
          // bottom: 46,
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

        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="hsl(var(--chart-2))"
          radius={4}
        >
          <LabelList
            position="top"
            className="fill-foreground"
            fontSize={12}
            width={window.innerWidth}
            formatter={(value: number) => priceFormatter.format(value)}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
