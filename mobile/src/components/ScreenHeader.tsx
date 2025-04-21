import { Button } from '@components/Button'
import { HStack } from '@gluestack-ui/themed'
import { CircleFadingPlus } from 'lucide-react-native'

export function ScreenHeader() {
  return (
    <HStack bg="$gray600" height="$64" pt="$16" justifyContent="flex-end">
      <Button
        variant="outline"
        iconSize="icon"
        icon={CircleFadingPlus}
        mr="$4"
      />
    </HStack>
  )
}
