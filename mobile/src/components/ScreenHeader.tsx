import { Button } from '@components/Button'
import { HStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { CircleFadingPlus } from 'lucide-react-native'

type ScreenHeaderProps = {
  type: 'newTransactions' | 'newAccountPayable'
}

export function ScreenHeader({ type }: ScreenHeaderProps) {
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  function handleNewTransaction() {
    if (type === 'newTransactions') {
      navigator.navigate('newTransactions')
    }
  }

  return (
    <HStack bg="$gray600" height="$64" pt="$16" justifyContent="flex-end">
      <Button
        variant="outline"
        type="icon"
        icon={CircleFadingPlus}
        mr="$4"
        onPress={handleNewTransaction}
      />
    </HStack>
  )
}
