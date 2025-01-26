import { useCallback } from 'react'

import { useAccountPayable } from '@/hooks/use-account-payable'

import { CardTransactionAccount } from '../card-transaction-accout/card-transaction-account'
import { MonthSelect } from '../month-select/month-select'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

type ListAccountsPayableProps = {
  type: 'fixed' | 'unfixed'
  title: string
}

export function ListAccountsPayable({ type, title }: ListAccountsPayableProps) {
  const { fixedAccountsPayable, unfixedAccountsPayable } = useAccountPayable()

  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    // await fetchListByMonth(Number(monthNumber))

    console.log(monthNumber)
  }, [])

  return (
    <Card className="mb-4 flex h-[400px] w-full flex-col lg:mr-4 lg:w-[480px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="max-sm:p-0">
        <div className="mt-4 w-full">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>

        {}

        <CardTransactionAccount
          accountsPayable={
            type === 'fixed'
              ? fixedAccountsPayable?.fixedAccountsPayable
              : unfixedAccountsPayable?.unfixedAccountsPayable
          }
        />
      </CardContent>
    </Card>
  )
}
