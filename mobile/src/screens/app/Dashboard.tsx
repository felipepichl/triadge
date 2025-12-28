import { BarChart } from '@components/Charts/BarChart'
import { PieChart } from '@components/Charts/PieChart'
import { MonthSelect } from '@components/GenericFormAndFileds/Fileds/MonthSelect'
import { DashboardHeader } from '@components/Headers/DashboardHeader'
import { Box, Heading, ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { getMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { apiListByMonth } from '@/api/app/transactions/list-by-month'

export function Dashboard() {
  const [income, setIncome] = useState(0)
  const [outcome, setOutcome] = useState(0)

  const fetchListByMonth = useCallback(async (monthNumber: number) => {
    const response = await apiListByMonth({ month: Number(monthNumber) })

    const { balance } = response

    if (response.transactions.length === 0) {
      setIncome(0)
      setOutcome(0)
    } else {
      setIncome(balance?.income || 0)
      setOutcome(balance?.outcome || 0)
    }
  }, [])

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      await fetchListByMonth(Number(monthNumber))
    },
    [fetchListByMonth],
  )

  useEffect(() => {
    const currentMonth = getMonth(new Date()) + 1
    fetchListByMonth(currentMonth)
  }, [fetchListByMonth])

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

        <PieChart income={income} outcome={outcome} />

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
