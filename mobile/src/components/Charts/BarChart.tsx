import { gluestackUIConfig } from '@gluestack-ui/config'
import { Center } from '@gluestack-ui/themed'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native'

export function BarChart() {
  const barColor = gluestackUIConfig.tokens.colors.green500

  const chartData = [
    { x: 'Categoria A', y: 4 },
    { x: 'Categoria B', y: 3 },
    { x: 'Categoria C', y: 2 },
    { x: 'Categoria D', y: 5 },
    { x: 'Categoria E', y: 8 },
    { x: 'Categoria F', y: 5 },
    { x: 'Categoria G', y: 9 },
    { x: 'Categoria H', y: 2 },
  ]

  return (
    <Center px="$8" pt="$2" pb="$2" alignItems="flex-start">
      <VictoryChart
        width={300}
        height={Math.min(Math.max(chartData.length * 62 + 32, 130), 600)}
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
          data={chartData}
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
