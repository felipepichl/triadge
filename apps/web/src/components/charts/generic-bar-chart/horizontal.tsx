import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { priceFormatter } from '@/util/formatter'

import { GenericBarChartProps } from '../generic-bar-chart'

export function Horizontal({ data }: GenericBarChartProps) {
  return (
    <ChartContainer
      className="w-full"
      config={{}}
      style={{
        height: Math.min(Math.max(data.length * 48 + 32, 130), 600),
      }}
    >
      <BarChart
        accessibilityLayer
        data={data}
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
            dataKey="name"
            position="insideLeft"
            className="fill-foreground"
            fontSize={12}
            width={window.innerWidth}
          />
          {/* <LabelList
            position="insideRight"
            className="fill-foreground"
            fontSize={12}
            width={window.innerWidth}
            formatter={(value: number) => priceFormatter.format(value)}
          /> */}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
