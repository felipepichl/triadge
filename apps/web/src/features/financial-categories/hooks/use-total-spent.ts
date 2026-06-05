import { TotalSpentDTO } from '@umabel/core'
import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListTotalSpentByFinancialCategory } from '@/features/financial-categories/api/list-total-spent-by-financial-category'
import { apiListTotalSpentToFixedAccountPayable } from '@/features/financial-categories/api/list-total-spent-to-fixed-account-payable'
import { apiListTotalSpentToUnfixedAccountPayable } from '@/features/financial-categories/api/list-total-spent-to-unfixed-account-payable'

type TotalSpentType =
  | 'transaction'
  | 'fixedAccountPayable'
  | 'unfixedAccountPayable'

const apiFnMap = {
  transaction: (month: number) =>
    apiListTotalSpentByFinancialCategory({ month, type: 'outcome' }),
  fixedAccountPayable: (month: number) =>
    apiListTotalSpentToFixedAccountPayable({ month }),
  unfixedAccountPayable: (month: number) =>
    apiListTotalSpentToUnfixedAccountPayable({ month }),
}

export function useTotalSpent(type: TotalSpentType, month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['total-spent', type, month],
    queryFn: async (): Promise<TotalSpentDTO[]> => {
      const response = await apiFnMap[type](month)

      return response.totalExpensesByFinancialCategory.map(
        ({ financialCategory, totalSpent }) => ({
          financialCategory: financialCategory.description,
          value: totalSpent,
        }),
      )
    },
    enabled: !!user && month > 0,
  })
}
