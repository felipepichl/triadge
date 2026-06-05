import { TransactionDTO } from '@umabel/core'

import { CardTransactionAccount } from '@/features/transactions/components/card-transaction-account/card-transaction-account'
import { useIsWideScreen } from '@/shared/hooks/use-is-wide-screen'

import { TableTransactions } from './table-transactions'

type TransactionsProps = {
  transactions: TransactionDTO['transactions']
}

export function Transactions({ transactions }: TransactionsProps) {
  const isWideScreen = useIsWideScreen(768)

  return (
    <>
      {isWideScreen ? (
        <TableTransactions transactions={transactions} />
      ) : (
        <CardTransactionAccount transactions={transactions} />
      )}
    </>
  )
}
