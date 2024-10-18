import { addMonths, startOfMonth } from 'date-fns'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiCreateTransaction } from '@/api/create-transaction'
import { apiListAllTransaction, Transaction } from '@/api/list-all-transaction'
import { apiListByDateRange } from '@/api/list-by-date-range'
import { apiListByType } from '@/api/list-by-type'
import { useAuth } from '@/hooks/use-auth'

type TransactionBody = {
  description: string
  value: string
  type: string
  date?: Date
  financialCategoryId: string
}

type TransactionContextData = {
  transactions: Transaction | undefined
  transactionByDateRangeAndType: Transaction | undefined
  createTransaction(data: TransactionBody): Promise<void>
  loadTransactionByDateRangeAndType(
    startDate?: Date,
    endDate?: Date,
    type?: 'income' | 'outcome',
  ): Promise<void>
}

type TransactionProviderProps = {
  children: ReactNode
}

const TransactionsContext = createContext({} as TransactionContextData)

function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction>()
  const [transactionByDateRangeAndType, setTransactionByDateRangeAndType] =
    useState<Transaction>()
  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  const createTransaction = useCallback(
    async ({
      description,
      value,
      type,
      date,
      financialCategoryId,
    }: TransactionBody) => {
      await apiCreateTransaction({
        description,
        value: parseFloat(value.replace('R$ ', '').replace(',', '.')),
        type,
        date,
        financialCategoryId,
      })

      setReload((prev) => !prev)
    },
    [],
  )

  const loadTransactionByDateRange = useCallback(
    async (startDate?: Date, endDate?: Date) => {
      const today = new Date()
      const firstDayOfMonth = startOfMonth(today)
      const firstDayOfNextMonth = startOfMonth(addMonths(today, 1))

      const start = startDate || firstDayOfMonth
      const end = endDate || firstDayOfNextMonth

      const response = await apiListByDateRange({
        startDate: start,
        endDate: end,
      })

      setTransactionByDateRangeAndType(response)
    },
    [],
  )

  const loadTransactionByDateRangeAndType = useCallback(
    async (startDate: Date, endDate: Date, type?: 'income' | 'outcome') => {
      const today = new Date()
      const firstDayOfMonth = startOfMonth(today)
      const firstDayOfNextMonth = startOfMonth(addMonths(today, 1))

      const start = startDate || firstDayOfMonth
      const end = endDate || firstDayOfNextMonth

      const transactionsByDateRange = await apiListByDateRange({
        startDate: start,
        endDate: end,
      })

      let filteredTransactions = transactionsByDateRange.transactions

      if (type) {
        const transactionsByType = await apiListByType({
          type,
        })

        filteredTransactions = filteredTransactions.filter((transaction) =>
          transactionsByType.transactions.some(
            (t) => t._id === transaction._id,
          ),
        )
      }

      setTransactionByDateRangeAndType({
        ...transactionsByDateRange,
        transactions: filteredTransactions,
      })
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

  useEffect(() => {
    loadTransactionByDateRange()
  }, [reload, loadTransactionByDateRange])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionByDateRangeAndType,
        createTransaction,
        loadTransactionByDateRangeAndType,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export type { TransactionContextData }
export { TransactionsContext, TransactionsProvider }
