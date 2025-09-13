import { useEffect, useState } from 'react'
import { Cell, Pie, PieChart, PieLabelRenderProps } from 'recharts'

import { ChartContainer, ChartLegend } from '@/components/ui/chart'

export type GenericPieChartProps = {
  data:
    | {
        name: string
        value: number
      }[]
    | undefined
}

export function GenericPieChart({ data }: GenericPieChartProps) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 690)
  const [internalData, setInternalData] = useState<typeof data>([])

  function generateColors(length: number) {
    return Array.from({ length }, (_, i) => {
      const hue = (i * (360 / length)) % 360
      return `hsl(${hue}, 65%, 50%)`
    })
  }

  function createPercentCalculator(
    internalData?: { name: string; value: number }[],
  ) {
    if (!internalData || internalData.length === 0) {
      return { getPercent: () => 0, total: 1 }
    }

    const total = internalData.reduce((acc, entry) => acc + entry.value, 0)

    function getPercent(value: number) {
      return (value / total) * 100
    }

    return { getPercent }
  }

  const { getPercent } = createPercentCalculator(internalData)

  const colors = generateColors(data?.length ?? 0)

  const renderLabel = internalData
    ? (props: PieLabelRenderProps) => {
        const { value, name } = props
        return `${name}: ${getPercent(value as number).toFixed(1)}%`
      }
    : null

  const legendPayload = internalData?.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
    value: `${item.name}:${getPercent(item.value)
      .toFixed(1)
      .toString()
      .padStart(4, '0')}%`,
  }))

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInternalData(data)
    }, 450)

    return () => clearTimeout(timeout)
  }, [data])

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
    <ChartContainer className="h-full min-h-[320px] w-full" config={{}}>
      <PieChart>
        {internalData! && (
          <Pie
            data={internalData}
            dataKey="value"
            label={isWideScreen ? (renderLabel ?? undefined) : undefined}
            labelLine={false}
            key={internalData.length}
          >
            {internalData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        )}

        {!isWideScreen && (
          <ChartLegend
            payload={legendPayload}
            content={({ payload }) => {
              if (!payload) return null

              return (
                <div
                  className="
                  grid 
                  grid-cols-2 
                  justify-items-center
                  sm:grid-cols-3
                  "
                >
                  {payload.map((entry, index) => (
                    <div
                      key={`item-${index}`}
                      className="flex w-full items-center justify-center"
                    >
                      <span
                        className="mr-1 h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: entry.color }}
                      />

                      <span className="w-24 text-center text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
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
