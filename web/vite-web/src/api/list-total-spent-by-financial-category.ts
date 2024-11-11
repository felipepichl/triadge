import { api } from '@/lib/axios'

export type ListTotalSpentByFinancialCategoryBody = {
  type: 'income' | 'outcome'
  month: number
}

export type ListTotalSpentByFinancialCategoryResponse = {
  totalExpensesByFinancialCategory: {
    financialCategory: {
      props: {
        description: string
      }
    }
    totalSpent: number
  }[]
}

export async function apiListTotalSpentByFinancialCategory({
  type,
  month,
}: ListTotalSpentByFinancialCategoryBody): Promise<ListTotalSpentByFinancialCategoryResponse> {
  const { data } = await api.get<ListTotalSpentByFinancialCategoryResponse>(
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
