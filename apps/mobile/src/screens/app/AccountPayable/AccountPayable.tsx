import { MonthSelect } from '@components/GenericFormAndFileds/Fileds/MonthSelect'
import { ScreenHeader } from '@components/Headers/ScreenHeader'
import { SummaryProps } from '@components/Summary/Summary'
import { SummaryScroll } from '@components/Summary/SummaryScroll'
import { VStack } from '@components/ui/vstack'
import { getMonth } from 'date-fns'
import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'

import { apiListFixedAccountsPayableByMonth } from '@/api/app/accounts-payable/list-fixed-by-month'
import { apiListPaidAccountsPayableByMonth } from '@/api/app/accounts-payable/list-paid-by-month'
import { apiListUnfixedAccountsPayableByMonth } from '@/api/app/accounts-payable/list-unfixed-by-month'
import { apiListUnpaidAccountsPayableByMonth } from '@/api/app/accounts-payable/list-unpaid'
import { priceFormatter } from '@/utils/formatter'

export function AccountPayable() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  const fetchAccountsPayable = useCallback(async (month: number) => {
    try {
      const [fixed, unfixed, unpaid, paid] = await Promise.all([
        apiListFixedAccountsPayableByMonth(month),
        apiListUnfixedAccountsPayableByMonth(month),
        apiListUnpaidAccountsPayableByMonth(month),
        apiListPaidAccountsPayableByMonth(month),
      ])

      setSummaries([
        {
          color: 'default',
          description: 'Gastos Fixos',
          icon: Pin,
          iconColor: '$green500',
          value: priceFormatter.format(
            fixed.fixedAccountsPayableTotalAmount ?? 0,
          ),
        },
        {
          color: 'default',
          description: 'Gastos Variáveis',
          icon: TrendingUpDown,
          iconColor: '$rose500',
          value: priceFormatter.format(
            unfixed.unfixedAccountsPayableTotalAmount ?? 0,
          ),
        },
        {
          color: 'rose',
          description: 'Contas a Pagar',
          icon: HandCoins,
          iconColor: '$gray100',
          value: priceFormatter.format(
            unpaid.unpaidAccountsPayableTotalAmount ?? 0,
          ),
        },
        {
          color: 'green',
          description: 'Total Pago no Mês',
          icon: DollarSign,
          iconColor: '$gray100',
          value: priceFormatter.format(
            paid.paidAccountsPayableTotalAmount ?? 0,
          ),
        },
      ])
    } catch {
      setSummaries([])
    }
  }, [])

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      await fetchAccountsPayable(Number(monthNumber))
    },
    [fetchAccountsPayable],
  )

  useEffect(() => {
    const currentMonth = getMonth(new Date()) + 1
    fetchAccountsPayable(currentMonth)
  }, [fetchAccountsPayable])

  return (
    <VStack flex={1}>
      <ScreenHeader type="newAccountPayable" />

      <SummaryScroll summaries={summaries} />

      <VStack mt="$64" px="$4">
        <MonthSelect onMonthSelect={handleMonthSelect} />
      </VStack>
    </VStack>
  )
}
