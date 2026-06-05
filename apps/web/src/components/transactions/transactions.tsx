import { TransactionDTO } from '@umabel/core'
import { useEffect, useState } from 'react'

import { CardTransactionAccount } from '@/components/card-transaction-account/card-transaction-account'

import { TableTransactions } from './table-transactions'

type TransactionsProps = {
  transactions: TransactionDTO['transactions']
}

export function Transactions({ transactions }: TransactionsProps) {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
