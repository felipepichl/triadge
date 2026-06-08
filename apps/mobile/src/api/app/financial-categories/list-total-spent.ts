import { ListTotalSpentByFinancialCategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type ListTotalSpentBody = {
  type: 'income' | 'outcome'
  month: number
}

export async function apiListTotalSpentByFinancialCategory({
  type,
  month,
}: ListTotalSpentBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  const { data } = await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
    '/financial-category/total-spent',
    {
      params: { type, month },
    },
  )

  return {
    totalExpensesByFinancialCategory: data.totalExpensesByFinancialCategory.map(
      ({ financialCategory, totalSpent }) => ({
        financialCategory,
        totalSpent,
      }),
    ),
  }
}
