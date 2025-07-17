import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, PieLabelRenderProps } from 'recharts'

import { ChartContainer } from '@/components/ui/chart'

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

export type GenericPieChartProps = {
  data:
    | {
        name: string
        value: number
      }[]
    | undefined
}

export function GenericPieChart({ data }: GenericPieChartProps) {
  const [internalData, setInternalData] = useState<typeof data>([])

  function createRenderLabel(
    data: { name: string; value: number }[] | undefined,
  ) {
    if (!data) return null

    const total = data.reduce((acc, entry) => acc + entry.value, 0)

    return (props: PieLabelRenderProps) => {
      const { value, name } = props
      const percent = ((value as number) / total) * 100
      return `${name}: ${percent.toFixed(1)}%`
    }
  }

  const renderLabel = createRenderLabel(data)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalData(data)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <ChartContainer className="w-full" config={{}}>
      <PieChart>
        {data! && (
          <Pie
            data={internalData}
            dataKey="value"
            label={renderLabel ?? undefined}
            labelLine={false}
            key={data.length}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        )}
      </PieChart>
    </ChartContainer>
  )
}

/* <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 46,
          left: 36,
          right: 36,
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
      </BarChart> */
