import { BarChart } from '@components/Charts/BarChart'
import { PieChart } from '@components/Charts/PieChart'
import { MonthSelect } from '@components/GenericFormAndFileds/Fileds/MonthSelect'
import { DashboardHeader } from '@components/Headers/DashboardHeader'
import { Box } from '@components/ui/box'
import { Heading } from '@components/ui/heading'
import { ScrollView } from '@components/ui/scroll-view'
import { Text } from '@components/ui/text'
import { VStack } from '@components/ui/vstack'
import { getMonth } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { apiListTotalSpentByFinancialCategory } from '@/api/app/financial-categories/list-total-spent'
import { apiListByMonth } from '@/api/app/transactions/list-by-month'

export function Dashboard() {
  const [income, setIncome] = useState(0)
  const [outcome, setOutcome] = useState(0)
  const [isLoadingPieChart, setIsLoadingPieChart] = useState(true)

  const [categoryData, setCategoryData] = useState<{ x: string; y: number }[]>(
    [],
  )
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true)

  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1)

  const fetchTransactions = useCallback(async (month: number) => {
    setIsLoadingPieChart(true)
    try {
      const response = await apiListByMonth({ month })

      const { balance } = response

      if (response.transactions.length === 0) {
        setIncome(0)
        setOutcome(0)
      } else {
        setIncome(balance?.income || 0)
        setOutcome(balance?.outcome || 0)
      }
    } finally {
      setIsLoadingPieChart(false)
    }
  }, [])

  const fetchCategories = useCallback(async (month: number) => {
    setIsLoadingBarChart(true)
    try {
      const response = await apiListTotalSpentByFinancialCategory({
        type: 'outcome',
        month,
      })

      const chartData = response.totalExpensesByFinancialCategory.map(
        ({ financialCategory, totalSpent }) => ({
          x: financialCategory.description,
          y: totalSpent,
        }),
      )

      setCategoryData(chartData)
    } finally {
      setIsLoadingBarChart(false)
    }
  }, [])

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      const month = Number(monthNumber)
      setSelectedMonth(month)
      await Promise.all([fetchTransactions(month), fetchCategories(month)])
    },
    [fetchTransactions, fetchCategories],
  )

  useEffect(() => {
    fetchTransactions(selectedMonth)
    fetchCategories(selectedMonth)
  }, [fetchTransactions, fetchCategories, selectedMonth])

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

        <PieChart
          income={income}
          outcome={outcome}
          isLoading={isLoadingPieChart}
        />

        <Box px="$8" pt="$5" pb="$5">
          <Heading color="$gray100" fontSize="$xl">
            Categorias
          </Heading>
          <Text color="$gray300" fontSize="$sm">
            Transações de saída
          </Text>
        </Box>

        <BarChart data={categoryData} isLoading={isLoadingBarChart} />
      </ScrollView>
    </VStack>
  )
}
