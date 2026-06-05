import { ListTotalSpentByFinancialCategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export type ListTotalSpentToFixedAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToFixedAccountPayable({
  month,
}: ListTotalSpentToFixedAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  try {
    const { data } = await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
      '/financial-category/total-spent/fixed/account-payable',
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
