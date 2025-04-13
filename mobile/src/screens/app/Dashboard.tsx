import { DashboardHeader } from '@components/DashboardHeader'
import { VStack } from '@gluestack-ui/themed'

export function Dashboard() {
  return (
    <VStack flex={1}>
      <DashboardHeader />
    </VStack>
  )
}
