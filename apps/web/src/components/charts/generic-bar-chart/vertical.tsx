import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { priceFormatter } from '@/util/formatter'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../ui/chart'
import { GenericBarChartProps } from '../generic-bar-chart'

export function Vertical({ data }: GenericBarChartProps) {
  return (
    <ChartContainer className="max-h-96 w-full" config={{}}>
      <BarChart
        accessibilityLayer
        data={data}
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
