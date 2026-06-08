import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { ListAccountsPayable } from '@/features/accounts-payable/components/list-accounts-payable'
import { useFixedAccountsPayable } from '@/features/accounts-payable/hooks/use-fixed-accounts-payable'
import { usePaidAccountsPayable } from '@/features/accounts-payable/hooks/use-paid-accounts-payable'
import { useUnfixedAccountsPayable } from '@/features/accounts-payable/hooks/use-unfixed-accounts-payable'
import { useUnpaidAccountsPayable } from '@/features/accounts-payable/hooks/use-unpaid-accounts-payable'
import { LineChartFinancialCategory } from '@/features/financial-categories/components/line-chart-financial-category'
import { NewTransactionAccount } from '@/features/transactions/components/new-transaction-account/new-transaction-account'
import { MonthSelect } from '@/shared/components/month-select'
import { SummaryProps } from '@/shared/components/summary/summary'
import { SummaryCarousel } from '@/shared/components/summary/summary-carousel'
import { Separator } from '@/shared/components/ui/separator'
import { priceFormatter } from '@/shared/util/formatter'

export function AccountPayable() {
  const currentMonth = new Date().getMonth() + 1
  const [month, setMonth] = useState(currentMonth)

  const { data: fixedAccountsPayable } = useFixedAccountsPayable(month)
  const { data: unfixedAccountsPayable } = useUnfixedAccountsPayable(month)
  const { data: unpaidAccountsPayable } = useUnpaidAccountsPayable(month)
  const { data: paidAccountsPayable } = usePaidAccountsPayable(month)

  const handleMonthSelect = (monthNumber: string) => {
    setMonth(Number(monthNumber))
  }

  const summaries = useMemo<SummaryProps[]>(
    () => [
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
        value: priceFormatter.format(
          unpaidAccountsPayable?.unpaidAccountsPayableTotalAmount ?? 0,
        ),
      },
      {
        color: 'green',
        description: 'Total Pago no Mês',
        icon: DollarSign,
        iconColor: '#fff',
        value: priceFormatter.format(
          paidAccountsPayable?.paidAccountsPayableTotalAmount ?? 0,
        ),
      },
    ],
    [
      fixedAccountsPayable,
      unfixedAccountsPayable,
      unpaidAccountsPayable,
      paidAccountsPayable,
    ],
  )

  return (
    <>
      <Helmet title="Contas a Pagar" />
      <div className="flex flex-row items-center justify-end max-md:flex-col ">
        <div className="mr-3 w-48 pb-3 max-md:mr-0 max-md:w-full">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>
        <div className="max-md:w-full">
          <NewTransactionAccount
            title="Nova Conta a Pagar"
            type="accountPayable"
          />
        </div>
      </div>

      <SummaryCarousel summaries={summaries} />

      <Separator className="mb-4 mt-4 max-md:mt-0" />

      <div className="flex flex-col lg:flex-row">
        <ListAccountsPayable type="fixed" title="Gastos Fixos" month={month} />
        <div className="flex-1">
          <LineChartFinancialCategory type="fixedAccountPayable" />
        </div>
      </div>

      <Separator className="mb-4 mt-1" />

      <div className="flex flex-col lg:flex-row">
        <ListAccountsPayable
          type="unfixed"
          title="Gastos Variáveis"
          month={month}
        />
        <div className="flex-1">
          <LineChartFinancialCategory type="unfixedAccountPayable" />
        </div>
      </div>
    </>
  )
}
