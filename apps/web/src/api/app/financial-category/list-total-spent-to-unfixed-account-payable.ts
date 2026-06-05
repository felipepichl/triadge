import { ListTotalSpentByFinancialCategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export type ListTotalSpentToUnfixedAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToUnfixedAccountPayable({
  month,
}: ListTotalSpentToUnfixedAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  try {
    const { data } = await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
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
