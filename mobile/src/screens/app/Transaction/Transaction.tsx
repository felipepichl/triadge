import { ScreenHeader } from '@components/Headers/ScreenHeader'
import { Summary, SummaryProps } from '@components/Summary'
import { ScrollView, VStack } from '@gluestack-ui/themed'
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react-native'
import { useEffect, useState } from 'react'

export function Transaction() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  useEffect(() => {
    const summariesResume: SummaryProps[] = [
      {
        color: 'default',
        description: 'Entradas',
        icon: ArrowDownCircle,
        iconColor: '$green500',
        value: 'R$ 10.000,00',
        // priceFormatter.format(
        //   transactionByDateRangeAndType.balance?.income ?? 0,
        // ),
      },
      {
        color: 'default',
        description: 'Saídas',
        icon: ArrowUpCircle,
        iconColor: '$rose500',
        value: 'R$ 2.000,00',
      },
      {
        color: 'green',
        description: 'Total',
        icon: DollarSign,
        iconColor: '$gray100',
        value: 'R$ 8.000,00',
        // totalAmount: priceFormatter.format(transactions?.balance?.total ?? 0),
      },
    ]

    setSummaries(summariesResume)
  }, [])
  return (
    <VStack>
      <ScreenHeader type="newTransactions" />

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
  )
}
