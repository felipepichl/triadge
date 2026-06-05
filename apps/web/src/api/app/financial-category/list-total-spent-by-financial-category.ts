import { ListTotalSpentByFinancialCategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export type ListTotalSpentByFinancialCategoryBody = {
  type: 'income' | 'outcome'
  month: number
}

export async function apiListTotalSpentByFinancialCategory({
  type,
  month,
}: ListTotalSpentByFinancialCategoryBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  try {
    const { data } = await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
      '/financial-category/total-spent',
      {
        params: { type, month },
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
