import {
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { LogOut } from 'lucide-react-native'
import { useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { UserPhoto } from '../UserPhoto'

export function DashboardHeader() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    if (isSigningOut) return

    setIsSigningOut(true)

    try {
      // Sign out immediately without the 7-second delay for better UX
      await signOut(true)
    } catch (error) {
      console.error('Error signing out:', error)
      // Even if there's an error, we can still sign out locally
      await signOut(true)
    } finally {
      setIsSigningOut(false)
    }
  }

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

      <Pressable
        onPress={handleSignOut}
        disabled={isSigningOut}
        p="$2"
        borderRadius="$md"
        $pressed={{
          bg: '$gray500',
        }}
      >
        <Icon
          as={LogOut}
          color={isSigningOut ? '$gray400' : '$red500'}
          size="xl"
        />
      </Pressable>
    </HStack>
  )
}
