import { Button } from '@components/Button'
import { Heading, HStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { ArrowLeft } from 'lucide-react-native'

type StackHeaderProps = {
  title: string
}

export function StackHeader({ title }: StackHeaderProps) {
  const navigator = useNavigation<StackNavigatorRoutesProps>()

  function handleGoBack() {
    navigator.goBack()
  }
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$4" alignItems="center" gap="$4">
      <Button
        variant="outline"
        type="icon"
        icon={ArrowLeft}
        iconSize="2xl"
        borderWidth="$0"
        onPress={handleGoBack}
      />
      <Heading color="$gray100" fontSize="$2xl">
        {title}
      </Heading>
    </HStack>
  )
}
