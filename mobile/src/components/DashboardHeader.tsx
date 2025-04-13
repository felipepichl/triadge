import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed'
import { LogOut } from 'lucide-react-native'

import { UserPhoto } from './UserPhoto'

export function DashboardHeader() {
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={{ uri: 'https://github.com/felipepichl.png' }}
        w="$16"
        h="$16"
      />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          Felipe Pichl
        </Heading>
      </VStack>

      <Icon as={LogOut} color="$red500" size="xl" />
    </HStack>
  )
}
