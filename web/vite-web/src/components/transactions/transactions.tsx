import { useEffect, useState } from 'react'

import { Transaction } from '@/api/list-all-transaction'

import { CardTransactions } from './card-transactions'
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
  transactions: Transaction['transactions']
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
        <CardTransactions transactions={transactions} />
      )}
    </>
  )
}
