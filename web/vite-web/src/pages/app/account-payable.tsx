import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { FixedAccountsPayable } from '@/components/fixed-accounts-payable/fixed-account-payable'
import { NewTransactionAccount } from '@/components/new-transaction-account/new-tranaction-account'
import { SummaryProps } from '@/components/summary/summary'
import { SummaryCarousel } from '@/components/summary/summary-carousel'
import { Separator } from '@/components/ui/separator'
import { useAccountPayable } from '@/hooks/use-account-payable'
import { priceFormatter } from '@/util/formatter'

export function AccountPayable() {
  const [summaries, setSummaries] = useState<SummaryProps[]>()

  const { fixedAccountsPayable, unfixedAccountsPayable } = useAccountPayable()

  useEffect(() => {
    const summariesResume: SummaryProps[] = [
      {
        color: 'default',
        description: 'Gastos Fixos',
        icon: Pin,
        iconColor: '#00b37e',
        value: priceFormatter.format(
          fixedAccountsPayable?.fixedAccountsPayableTotalAmount ?? 0,
        ),
      },
      {
        color: 'default',
        description: 'Gastos Variáveis',
        icon: TrendingUpDown,
        iconColor: '#ff0000',
        value: priceFormatter.format(
          unfixedAccountsPayable?.unfixedAccountsPayableTotalAmount ?? 0,
        ),
      },
      {
        color: 'rose',
        description: 'Contas a Pagar',
        icon: HandCoins,
        iconColor: '#fff',
        value: 'R$ 800,00',
      },
      {
        color: 'green',
        description: 'Total Pago no Mês',
        icon: DollarSign,
        iconColor: '#fff',
        value: 'R$ 1.000,00',
      },
    ]

    setSummaries(summariesResume)
  }, [fixedAccountsPayable, unfixedAccountsPayable])
  return (
    <>
      <Helmet title="Contas a Pagar" />
      <NewTransactionAccount title="Nova Conta a Pagar" type="accountPayable" />

      <SummaryCarousel summaries={summaries} boxes={4} />

      <Separator className="mb-4 mt-4" />

      <FixedAccountsPayable />
    </>
  )
}
