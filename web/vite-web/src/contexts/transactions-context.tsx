import { createContext, ReactNode, useEffect, useState } from 'react'

import { apiListAllTransaction, Transaction } from '@/api/list-all-transaction'

type TransactionContextData = {
  transactions: Transaction | undefined
}

type TransactionProviderProps = {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction>()

  async function loadTransaction() {
    const result = await apiListAllTransaction()

    setTransaction(result)
  }

  useEffect(() => {
    loadTransaction()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export type { TransactionContextData }
export { TransactionsContext, TransactionsProvider }
