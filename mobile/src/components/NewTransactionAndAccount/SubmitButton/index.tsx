import { Button } from '@components/Button'
import { Box, Center, Divider } from '@gluestack-ui/themed'

export function SubmitButton() {
  return (
    <Center flex={1} px="$4">
      <Box py="$8" w="$full">
        <Divider bgColor="$gray500" />
      </Box>
      <Button title="Cadastrar" type="default" />
    </Center>
  )
}
