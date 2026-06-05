import { CardTransactionAccount } from '@/features/transactions/components/card-transaction-account/card-transaction-account'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { useFixedAccountsPayable } from '@/features/accounts-payable/hooks/use-fixed-accounts-payable'
import { useUnfixedAccountsPayable } from '@/features/accounts-payable/hooks/use-unfixed-accounts-payable'

type ListAccountsPayableProps = {
  type: 'fixed' | 'unfixed'
  title: string
  month: number
}

export function ListAccountsPayable({
  type,
  title,
  month,
}: ListAccountsPayableProps) {
  const { data: fixedAccountsPayable } = useFixedAccountsPayable(month)
  const { data: unfixedAccountsPayable } = useUnfixedAccountsPayable(month)

  return (
    <Card className="mb-4 flex h-[400px] w-full flex-col lg:mr-4 lg:w-[480px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="max-sm:p-0">
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
