import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { LogOut } from 'lucide-react-native'
import { useCallback } from 'react'
import { VictoryPie } from 'victory-native'

import { MonthSelect } from './MonthSelect'
import { UserPhoto } from './UserPhoto'

export function DashboardHeader() {
  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    console.log(monthNumber)
  }, [])

  return (
    <VStack>
      <HStack
        bg="$gray600"
        pt="$16"
        pb="$5"
        px="$8"
        alignItems="center"
        gap="$4"
      >
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

      <Box px="$8" pt="$5" pb="$5">
        <Heading color="$gray100" fontSize="$xl">
          Transações
        </Heading>
        <Text color="$gray300" fontSize="$sm">
          Por entrada e saída
        </Text>
      </Box>
      <MonthSelect onMonthSelect={handleMonthSelect} />
      <Center mt="$5">
        <VictoryPie
          data={[
            { x: 'Entrada', y: 97 },
            { x: 'Saída', y: 35 },
          ]}
          colorScale={['green', 'red']}
          width={300}
          height={300}
          labelRadius={60}
          style={{
            labels: {
              fill: 'white',
              fontSize: 18,
            },
          }}
          padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
        />
      </Center>
    </VStack>
  )
}
