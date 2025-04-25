import { Heading, HStack, VStack } from '@gluestack-ui/themed'

export function NewTransaction() {
  return (
    <VStack flex={1}>
      <HStack
        bg="$gray600"
        pt="$16"
        pb="$5"
        px="$8"
        alignItems="center"
        gap="$4"
      >
        <Heading color="$gray100" fontSize="$2xl">
          Nova Transação
        </Heading>
      </HStack>
    </VStack>
  )
}
