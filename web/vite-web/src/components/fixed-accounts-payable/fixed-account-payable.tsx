import { useCallback } from 'react'

import { useAccountPayable } from '@/hooks/use-account-payable'

import { CardTransactionAccount } from '../card-transaction-accout/card-transaction-account'
import { MonthSelect } from '../month-select/month-select'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

export function FixedAccountsPayable() {
  const { fixedAccountsPayable } = useAccountPayable()

  const handleMonthSelect = useCallback(async (monthNumber: string) => {
    // await fetchListByMonth(Number(monthNumber))

    console.log(monthNumber)
  }, [])

  return (
    <Card className="mb-4 flex h-[400px] w-full flex-col lg:mr-2 lg:w-[480px]">
      <CardHeader>
        <CardTitle>Gastos Fixos</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <div className="mt-4 w-full">
          <MonthSelect onMonthSelect={handleMonthSelect} />
        </div>

        {}

        <CardTransactionAccount
          accountsPayable={fixedAccountsPayable?.fixedAccountsPayable}
        />
      </CardContent>
    </Card>
  )
}
