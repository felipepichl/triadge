import { Center } from '@components/ui/center'
import { Skeleton } from '@components/ui/skeleton'
import { Text } from '@components/ui/text'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native'

import { gluestackUIConfig } from '../../../config/gluestack-ui.config'

type BarChartData = {
  x: string
  y: number
}

type BarChartProps = {
  data: BarChartData[]
  isLoading?: boolean
}

export function BarChart({ data, isLoading = false }: BarChartProps) {
  const barColor = gluestackUIConfig.tokens.colors.green500

  if (isLoading) {
    return (
      <Center px="$8" pt="$2" pb="$2">
        <Skeleton variant="rounded" style={{ width: 300, height: 200 }} />
      </Center>
    )
  }

  if (data.length === 0) {
    return (
      <Center px="$8" pt="$4" pb="$4">
        <Text color="$gray300" fontSize="$sm">
          Nenhum dado encontrado
        </Text>
      </Center>
    )
  }

  return (
    <Center px="$8" pt="$2" pb="$2" alignItems="flex-start">
      <VictoryChart
        width={300}
        height={Math.min(Math.max(data.length * 62 + 32, 130), 600)}
        padding={{ top: 48, left: 0, bottom: 48 }}
        animate={{
          duration: 1000,
          easing: 'exp',
          onLoad: { duration: 1000 },
        }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
            ticks: { stroke: 'none' },
            tickLabels: { fill: 'none' },
            grid: { stroke: 'none' },
          }}
        />

        <VictoryBar
          horizontal
          data={data}
          labels={({ datum }) => datum.x}
          labelComponent={
            <VictoryLabel
              x={10}
              textAnchor="start"
              style={{
                fill: 'white',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            />
          }
          style={{
            data: {
              fill: barColor,
              stroke: 'none',
            },
            labels: {
              fontSize: 12,
            },
          }}
          barWidth={58}
          cornerRadius={{ top: 8, bottom: 8 }}
        />
      </VictoryChart>
    </Center>
  )
}
