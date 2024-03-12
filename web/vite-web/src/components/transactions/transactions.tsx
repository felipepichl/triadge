import { useEffect, useState } from 'react'

import { CardTransactions } from './card-transactions'
import { TableTransactions } from './table-transactions'

export type TransactionsProps = {
  descrition: string
  value: string
  category: string
}

export type TransactionsData = {
  data: TransactionsProps[]
}

export function Transactions({ data }: TransactionsData) {
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
        <TableTransactions data={data} />
      ) : (
        <CardTransactions data={data} />
      )}
    </>
  )
}
