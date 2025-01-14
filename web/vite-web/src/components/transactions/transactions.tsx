import { useEffect, useState } from 'react'

import { CardTransactionAccount } from '@/components/card-transaction-accout/card-transaction-account'
import { TransactionDTO } from '@/dtos/transaction-dto'

// import { CardTransactions } from './card-transactions'
import { TableTransactions } from './table-transactions'

// export type TransactionsProps = {
//   descrition: string
//   value: string
//   category: string
// }

// export type TransactionsData = {
//   transactions: {
//     _id: string
//     props: {
//       description: string
//       type: string
//       value: number
//       transactionCategory: {
//         id: string
//         description: string
//       }
//     }
//   }[]
// }

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
