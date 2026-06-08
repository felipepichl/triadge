import { Button } from '@components/Button'
import { Box } from '@components/ui/box'
import { Center } from '@components/ui/center'
import { Divider } from '@gluestack-ui/themed'

type SubmitButtonProps = {
  onPress?: () => void
  isLoading?: boolean
}

export function SubmitButton({ onPress, isLoading = false }: SubmitButtonProps) {
  return (
    <Center flex={1} px="$4">
      <Box py="$8" w="$full">
        <Divider bgColor="$gray500" />
      </Box>
      <Button
        title="Cadastrar"
        type="default"
        onPress={onPress}
        isLoading={isLoading}
      />
    </Center>
  )
}
