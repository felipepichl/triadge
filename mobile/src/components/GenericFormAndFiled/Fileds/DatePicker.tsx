import { HStack, Icon, Text } from '@gluestack-ui/themed'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable } from 'react-native'

export function DatePicker() {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <HStack
        bg="$gray700"
        h="$14"
        px="$4"
        borderRadius="$xl"
        borderColor={isPressed ? '$green500' : '$gray300'}
        borderWidth="$1"
        alignItems="center"
      >
        <Icon as={Calendar} color="$gray300" size="xl" mr="$4" />
        <Text color="$gray300" fontFamily="$body">
          {format(new Date(), 'LLLL dd, y', { locale: ptBR })}
        </Text>
      </HStack>
    </Pressable>
  )
}
