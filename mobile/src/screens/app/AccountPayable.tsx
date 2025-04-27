import { ScreenHeader } from '@components/ScreenHeader'
import { VStack } from '@gluestack-ui/themed'

export function AccountPayable() {
  return (
    <VStack flex={1}>
      <ScreenHeader type="newAccountPayable" />
    </VStack>
  )
}
