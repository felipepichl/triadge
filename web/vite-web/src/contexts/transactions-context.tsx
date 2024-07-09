import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiCreateTransaction } from '@/api/create-transaction'
import { apiListAllTransaction, Transaction } from '@/api/list-all-transaction'
import { useAuth } from '@/hooks/use-auth'

type TransactionBody = {
  description: string
  value: string
  type: string
  transactionCategoryId: string
}

type TransactionContextData = {
  transactions: Transaction | undefined
  createTransaction(data: TransactionBody): Promise<void>
}

type TransactionProviderProps = {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction>()
  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  const createTransaction = useCallback(
    async ({
      description,
      value,
      type,
      transactionCategoryId,
    }: TransactionBody) => {
      await apiCreateTransaction({
        description,
        value: parseFloat(value.replace('R$ ', '').replace(',', '.')),
        type,
        transactionCategoryId,
      })

      setReload((prev) => !prev)
    },
    [],
  )

  useEffect(() => {
    async function loadTransaction() {
      const response = await apiListAllTransaction()
      setTransaction(response)
    }

    loadTransaction()
  }, [user, reload])

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export type { TransactionContextData }
export { TransactionsContext, TransactionsProvider }
