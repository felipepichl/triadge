import { Loading } from '@components/Loading'
import { ScreenHeader } from '@components/Headers/ScreenHeader'
import { SummaryProps } from '@components/Summary/Summary'
import { SummaryScroll } from '@components/Summary/SummaryScroll'
import { VStack } from '@components/ui/vstack'
import {
  endOfMonth,
  startOfMonth,
} from 'date-fns'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'

import { apiListByDateRange } from '@/api/app/transactions/list-by-date-range'
import { priceFormatter } from '@/utils/formatter'

export function Transaction() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    <VStack>
      <ScreenHeader type="newTransactions" />

      <SummaryScroll summaries={summaries} />
    </VStack>
  )
}
