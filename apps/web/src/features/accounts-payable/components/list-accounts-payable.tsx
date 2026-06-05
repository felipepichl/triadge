import { useCallback } from 'react'

import { useAccountPayable } from '@/features/accounts-payable/hooks/use-account-payable'

import { CardTransactionAccount } from '@/features/transactions/components/card-transaction-account/card-transaction-account'
import { MonthSelect } from '@/shared/components/month-select'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'

type ListAccountsPayableProps = {
  type: 'fixed' | 'unfixed'
  title: string
}

export function ListAccountsPayable({ type, title }: ListAccountsPayableProps) {
  const {
    fixedAccountsPayable,
    unfixedAccountsPayable,
    listAllFixedAccountsPayableByMonth,
    listAllUnfixedAccountsPayableByMonth,
  } = useAccountPayable()

  const handleMonthSelect = useCallback(
    async (monthNumber: string) => {
      const apiMap = {
        fixed: listAllFixedAccountsPayableByMonth,
        unfixed: listAllUnfixedAccountsPayableByMonth,
      }

      const selectedApi = apiMap[type]
      if (selectedApi) {
        await selectedApi(monthNumber)
      }
    },
    [
      listAllFixedAccountsPayableByMonth,
      listAllUnfixedAccountsPayableByMonth,
      type,
    ],
  )

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

        <CardTransactionAccount
          accountsPayable={
            type === 'fixed'
              ? fixedAccountsPayable?.fixedAccountsPayable
              : unfixedAccountsPayable?.unfixedAccountsPayable
          }
          type={type === 'fixed' ? 'fixed' : 'unfixed'}
        />
      </CardContent>
    </Card>
  )
}
