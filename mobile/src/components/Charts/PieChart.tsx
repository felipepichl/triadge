import { gluestackUIConfig } from '@gluestack-ui/config'
import { Center } from '@gluestack-ui/themed'
import { VictoryPie } from 'victory-native'

type PieChartProps = {
  income: number
  outcome: number
}

export function PieChart({ income, outcome }: PieChartProps) {
  const incomeColor = gluestackUIConfig.tokens.colors.green500
  const outcomeColor = gluestackUIConfig.tokens.colors.red500

  return (
    <Center mt="$5">
      <VictoryPie
        data={[
          { x: 'Entrada', y: income },
          { x: 'Saída', y: outcome },
        ]}
        colorScale={[incomeColor, outcomeColor]}
        width={300}
        height={300}
        labelRadius={60}
        animate={{
          duration: 1000,
          easing: 'exp',
          onLoad: { duration: 1000 },
        }}
        style={{
          labels: {
            fill: 'white',
            fontSize: 18,
          },
        }}
        padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />
    </Center>
  )
}
