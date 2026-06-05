import { TransactionDTO } from '@umabel/core'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListByDateRange } from '@/features/transactions/api/list-by-date-range'
import { apiListByType } from '@/features/transactions/api/list-by-type'

export function useTransactionsByDateRange(
  startDate?: Date,
  endDate?: Date,
  type?: 'income' | 'outcome',
) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['transactions', 'date-range', startDate, endDate, type],
    queryFn: async (): Promise<TransactionDTO> => {
      const transactionsByDateRange = await apiListByDateRange({
        startDate,
        endDate,
      })

      if (!type) return transactionsByDateRange

      const transactionsByType = await apiListByType({ type })

      const filteredTransactions =
        transactionsByDateRange.transactions.filter((transaction) =>
          transactionsByType.transactions.some(
            (t) => t._id === transaction._id,
          ),
        )

      return {
        ...transactionsByDateRange,
        transactions: filteredTransactions,
      }
    },
    enabled: !!user && !!startDate && !!endDate,
  })
}
