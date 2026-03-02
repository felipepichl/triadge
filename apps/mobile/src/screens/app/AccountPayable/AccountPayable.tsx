import { Button } from '@components/Button'
import { ScreenHeader } from '@components/Headers/ScreenHeader'
import { SummaryProps } from '@components/Summary/Summary'
import { SummaryScroll } from '@components/Summary/SummaryScroll'
import { VStack } from '@components/ui/vstack'
import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react-native'
import { useEffect, useState } from 'react'

import {
  testNotification,
  testNotificationImmediate,
} from '@/utils/test-notification'

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

      {/* TEST BUTTONS - Remove after testing */}
      {/* Added margin top to avoid overlapping with SummaryScroll (which is absolute positioned) */}
      <VStack px="$4" pb="$4" gap="$2" mt="$64">
        <Button
          title="Testar Notificação (10s - Bloqueie o app)"
          type="default"
          onPress={testNotification}
        />
        <Button
          title="Testar Notificação (Imediata)"
          type="default"
          onPress={testNotificationImmediate}
        />
      </VStack>
    </VStack>
  )
}
