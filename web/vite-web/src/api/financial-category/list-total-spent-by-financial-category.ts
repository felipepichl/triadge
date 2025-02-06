import { ListTotalSpentByFinancialCategoryResponseDTO } from '@/dtos/financial-category-dto'
import { api } from '@/lib/axios'

export type ListTotalSpentByFinancialCategoryBody = {
  type: 'income' | 'outcome'
  month: number
}

export async function apiListTotalSpentByFinancialCategory({
  type,
  month,
}: ListTotalSpentByFinancialCategoryBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
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
}
