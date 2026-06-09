import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Summary, SummaryProps } from '@components/Summary/Summary'
import { HStack } from '@components/ui/hstack'
import { ScrollView } from '@components/ui/scroll-view'
import { VStack } from '@components/ui/vstack'
import { useNavigation } from '@react-navigation/native'
import { StackNavigatorRoutesProps } from '@routes/app/stack.routes'
import { TransactionDetailDTO } from '@umabel/core'
import { endOfMonth, startOfMonth } from 'date-fns'
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CircleFadingPlus,
  DollarSign,
} from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'

import { apiListByDateRange } from '@/api/app/transactions/list-by-date-range'
import { TransactionItem } from '@/components/TransactionItem'
import { AnimatedHeaderScrollView } from '@/shared/ui/organisms/animated-header-scrollview'
import { priceFormatter } from '@/utils/formatter'

export function Transaction() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])
  const [transactions, setTransactions] = useState<TransactionDetailDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigator = useNavigation<StackNavigatorRoutesProps>()

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    const now = new Date()
    const start = startOfMonth(now)
    const end = endOfMonth(now)

    try {
      const response = await apiListByDateRange({
        startDate: start,
        endDate: end,
      })

      const income = response.balance?.income ?? 0
      const outcome = response.balance?.outcome ?? 0
      const total = response.balance?.total ?? 0

      setTransactions(response.transactions)

      setSummaries([
        {
          color: 'default',
          description: 'Entradas',
          icon: ArrowDownCircle,
          iconColor: '$green500',
          value: priceFormatter.format(income),
        },
        {
          color: 'default',
          description: 'Saídas',
          icon: ArrowUpCircle,
          iconColor: '$rose500',
          value: priceFormatter.format(outcome),
        },
        {
          color: 'green',
          description: 'Total',
          icon: DollarSign,
          iconColor: '$gray100',
          value: priceFormatter.format(total),
        },
      ])
    } catch {
      setSummaries([])
      setTransactions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  if (isLoading) {
    return <Loading />
  }

  return (
    <AnimatedHeaderScrollView
      rightComponent={
        <Button
          variant="outline"
          type="icon"
          icon={CircleFadingPlus}
          onPress={() => navigator.navigate('newTransactions')}
        />
      }
      headerComponent={
        <VStack pb="$16">
          <HStack bg="$gray600" height="$64" pt="$16" justifyContent="flex-end">
            <Button
              variant="outline"
              type="icon"
              icon={CircleFadingPlus}
              mr="$4"
              onPress={() => navigator.navigate('newTransactions')}
            />
          </HStack>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 24 }}
            width="100%"
            position="absolute"
            mt="$33"
          >
            {summaries.map((summary) => (
              <Summary
                key={summary.description}
                color={summary.color}
                description={summary.description}
                icon={summary.icon}
                iconColor={summary.iconColor}
                value={summary.value}
              />
            ))}
          </ScrollView>
        </VStack>
      }
    >
      <VStack pt="$6" pb="$8">
        {transactions.map((item) => (
          <TransactionItem
            key={item._id}
            description={item.description}
            amount={item.amount}
            type={item.type}
            date={item.date}
            categoryName={item.financialCategory?.description}
          />
        ))}
      </VStack>
    </AnimatedHeaderScrollView>
  )
}
