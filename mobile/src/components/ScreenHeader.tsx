import { Button } from '@components/Button'
import { HStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { CircleFadingPlus } from 'lucide-react-native'

export function ScreenHeader() {
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  function handleNewTransaction() {
    navigator.navigate('newTransactions')
  }

  return (
    <HStack bg="$gray600" height="$64" pt="$16" justifyContent="flex-end">
      <Button
        variant="outline"
        iconSize="icon"
        icon={CircleFadingPlus}
        mr="$4"
        onPress={handleNewTransaction}
      />
    </HStack>
  )
}
