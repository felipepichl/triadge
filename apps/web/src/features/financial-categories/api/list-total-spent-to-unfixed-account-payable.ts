import { ListTotalSpentByFinancialCategoryResponseDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export type ListTotalSpentToUnfixedAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToUnfixedAccountPayable({
  month,
}: ListTotalSpentToUnfixedAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  try {
    const { data } =
      await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
        '/financial-category/total-spent/unfixed/account-payable',
        {
          params: { month },
        },
      )

    const totalExpensesByFinancialCategory =
      data.totalExpensesByFinancialCategory.map(
        ({ financialCategory, totalSpent }) => ({
          financialCategory,
          totalSpent,
        }),
      )

    return {
      totalExpensesByFinancialCategory,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
