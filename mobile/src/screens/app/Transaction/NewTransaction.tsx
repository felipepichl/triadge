import { StackHeader } from '@components/Headers/StackHeader'
import { VStack } from '@gluestack-ui/themed'

export function NewTransaction() {
  return (
    <VStack flex={1}>
      <StackHeader title="Nova Transação" />
    </VStack>
  )
}
