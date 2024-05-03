import { createContext, ReactNode, useEffect, useState } from 'react'

import { apiListAllTransaction, Transaction } from '@/api/list-all-transaction'
import { useAuth } from '@/hooks/use-auth'

type TransactionContextData = {
  transactions: Transaction | undefined
}

type TransactionProviderProps = {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction>()

  const { user } = useAuth()

  useEffect(() => {
    async function loadTransaction() {
      const response = await apiListAllTransaction()
      setTransaction(response)
    }

    loadTransaction()
  }, [user?.name])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export type { TransactionContextData }
export { TransactionsContext, TransactionsProvider }
