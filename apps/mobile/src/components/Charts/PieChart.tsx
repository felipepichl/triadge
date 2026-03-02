import { Center } from '@components/ui/center'
import { Skeleton } from '@components/ui/skeleton'
import { VictoryPie } from 'victory-native'

import { gluestackUIConfig } from '../../../config/gluestack-ui.config'

type PieChartProps = {
  income: number
  outcome: number
  isLoading?: boolean
}

export function PieChart({
  income,
  outcome,
  isLoading = false,
}: PieChartProps) {
  const incomeColor = gluestackUIConfig.tokens.colors.green500
  const outcomeColor = gluestackUIConfig.tokens.colors.red500

  if (isLoading) {
    return (
      <Center mt="$5">
        <Skeleton variant="circular" style={{ width: 300, height: 300 }} />
      </Center>
    )
  }

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
