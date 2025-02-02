import { addMonths, startOfMonth } from 'date-fns'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiCreateTransaction } from '@/api/create-transaction'
import { apiListAllTransaction } from '@/api/list-all-transaction'
import { apiListByDateRange } from '@/api/list-by-date-range'
import { apiListByType } from '@/api/list-by-type'
import { TransactionDTO } from '@/dtos/transaction-dto'
import { useAuth } from '@/hooks/use-auth'

type TransactionBody = {
  description: string
  amount: string
  date?: Date
  type: string
  financialCategoryId: string
  subcategoryId?: string
}

type TransactionContextData = {
  transactions: TransactionDTO | undefined
  transactionByDateRangeAndType: TransactionDTO | undefined
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
  const [transactions, setTransaction] = useState<TransactionDTO>()
  const [transactionByDateRangeAndType, setTransactionByDateRangeAndType] =
    useState<TransactionDTO>()
  const [reload, setReload] = useState(false)

  const { user } = useAuth()

  const createTransaction = useCallback(
    async ({
      description,
      amount,
      type,
      date,
      financialCategoryId,
      subcategoryId,
    }: TransactionBody) => {
      await apiCreateTransaction({
        description,
        amount: parseFloat(
          amount.replace('R$ ', '').replace('.', '').replace(',', '.'),
        ),
        type,
        date,
        financialCategoryId,
        subcategoryId,
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
  }, [user])

  useEffect(() => {
    loadTransactionByDateRange()
  }, [loadTransactionByDateRange, reload])

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
