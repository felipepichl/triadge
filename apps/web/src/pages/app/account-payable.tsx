import { DollarSign, HandCoins, Pin, TrendingUpDown } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { LineChartFinancialCategory } from '@/components/charts/line-chart-financial-category'
import { ListAccountsPayable } from '@/components/list-accounts-payable'
import { MonthSelect } from '@/components/month-select'
import { NewTransactionAccount } from '@/components/new-transaction-account/new-tranaction-account'
import { SummaryProps } from '@/components/summary/summary'
import { SummaryCarousel } from '@/components/summary/summary-carousel'
import { Separator } from '@/components/ui/separator'
import { useAccountPayable } from '@/hooks/use-account-payable'
import { useFinancialCategoryAndSubcategory } from '@/hooks/use-financial-category-and-subcategory'
import { priceFormatter } from '@/util/formatter'

export function AccountPayable() {
  const [summaries, setSummaries] = useState<SummaryProps[]>([])

  const {
    fixedAccountsPayable,
    unfixedAccountsPayable,
    unpaidAccountsPayable,
    paidAccountsPayable,
    listAllFixedAccountsPayableByMonth,
    listAllUnfixedAccountsPayableByMonth,
    listAllUnpaidAccountsPayableByMonth,
    listAllPaidAccountsPayableByMonth,
  } = useAccountPayable()

  const { listTotalSpentToUnfixedAccountPayable } =
    useFinancialCategoryAndSubcategory()

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      listAllFixedAccountsPayableByMonth(monthNumber)
      listAllUnfixedAccountsPayableByMonth(monthNumber)
      listAllUnpaidAccountsPayableByMonth(monthNumber)
      listAllPaidAccountsPayableByMonth(monthNumber)

      listTotalSpentToUnfixedAccountPayable(Number(monthNumber))
    },
    [
      listAllFixedAccountsPayableByMonth,
      listAllUnfixedAccountsPayableByMonth,
      listAllUnpaidAccountsPayableByMonth,
      listAllPaidAccountsPayableByMonth,
      listTotalSpentToUnfixedAccountPayable,
    ],
  )

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
    ]

    setSummaries(summariesResume)
  }, [
    fixedAccountsPayable,
    unfixedAccountsPayable,
    unpaidAccountsPayable,
    paidAccountsPayable,
  ])
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
        <ListAccountsPayable type="fixed" title="Gastos Fixos" />
        <div className="flex-1">
          <LineChartFinancialCategory type="fixedAccountPayable" />
        </div>
      </div>

      <Separator className="mb-4 mt-1" />

      <div className="flex flex-col lg:flex-row">
        <ListAccountsPayable type="unfixed" title="Gastos Variáveis" />
        <div className="flex-1">
          <LineChartFinancialCategory type="unfixedAccountPayable" />
        </div>
      </div>
    </>
  )
}
