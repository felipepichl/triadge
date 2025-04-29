import { ScreenHeader } from '@components/Headers/ScreenHeader'
import { SummaryProps } from '@components/Summary/Summary'
import { SummaryScroll } from '@components/Summary/SummaryScroll'
import { VStack } from '@gluestack-ui/themed'
import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react-native'
import { useEffect, useState } from 'react'

export function AccountPayable() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  useEffect(() => {
    const summariesResume: SummaryProps[] = [
      {
        color: 'default',
        description: 'Gastos Fixos',
        icon: Pin,
        iconColor: '$green500',
        value: 'R$ 10.000,00',
        // priceFormatter.format(
        //   transactionByDateRangeAndType.balance?.income ?? 0,
        // ),
      },
      {
        color: 'default',
        description: 'Gastos Variáveis',
        icon: TrendingUpDown,
        iconColor: '$rose500',
        value: 'R$ 2.000,00',
      },
      {
        color: 'rose',
        description: 'Contas a Pagar',
        icon: HandCoins,
        iconColor: '$gray100',
        value: 'R$ 8.000,00',
        // totalAmount: priceFormatter.format(transactions?.balance?.total ?? 0),
      },
      {
        color: 'green',
        description: 'Total Pago no Mês',
        icon: DollarSign,
        iconColor: '$gray100',
        value: 'R$ 8.000,00',
        // value: priceFormatter.format(
        //   paidAccountsPayable?.paidAccountsPayableTotalAmount ?? 0,
        // ),
      },
    ]

    setSummaries(summariesResume)
  }, [])

  return (
    <VStack flex={1}>
      <ScreenHeader type="newAccountPayable" />

      <SummaryScroll summaries={summaries} />
    </VStack>
  )
}
