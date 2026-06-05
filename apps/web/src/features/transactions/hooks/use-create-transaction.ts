import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiCreateTransaction } from '@/features/transactions/api/create-transaction'
import { parseCurrency } from '@/shared/util/formatter'

type CreateTransactionInput = {
  description: string
  amount: string
  date?: Date
  type: string
  financialCategoryId: string
  subcategoryId?: string
}

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      description,
      amount,
      type,
      date,
      financialCategoryId,
      subcategoryId,
    }: CreateTransactionInput) =>
      apiCreateTransaction({
        description,
        amount: parseCurrency(amount),
        type,
        date,
        financialCategoryId,
        subcategoryId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
