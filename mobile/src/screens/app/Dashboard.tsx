import { BarChart } from '@components/Charts/BarChart'
import { PieChart } from '@components/Charts/PieChart'
import { DashboardHeader } from '@components/Headers/DashboardHeader'
import { MonthSelect } from '@components/MonthSelect'
import { Box, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { useCallback } from 'react'

export function Dashboard() {
  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    console.log(monthNumber)
  }, [])

  return (
    <VStack flex={1}>
      <DashboardHeader />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box px="$8" pt="$5" pb="$5">
          <Heading color="$gray100" fontSize="$xl">
            Transações
          </Heading>
          <Text color="$gray300" fontSize="$sm">
            Por entrada e saída
          </Text>
        </Box>

        <MonthSelect onMonthSelect={handleMonthSelect} />

        <PieChart income={30} outcome={70} />

        <Box px="$8" pt="$5" pb="$5">
          <Heading color="$gray100" fontSize="$xl">
            Categorias
          </Heading>
          <Text color="$gray300" fontSize="$sm">
            Transações de saída
          </Text>
        </Box>

        <MonthSelect onMonthSelect={handleMonthSelect} />

        <BarChart />
      </ScrollView>
    </VStack>
  )
}
