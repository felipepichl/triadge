import { ListTotalSpentByFinancialCategoryResponseDTO } from '@/dtos/financial-category-dto'
import { api } from '@/lib/axios'

export type ListTotalSpentToAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToAccountPayable({
  month,
}: ListTotalSpentToAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
  const { data } = await api.get<ListTotalSpentByFinancialCategoryResponseDTO>(
    '/financial-category/total-spent/account-payable',
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
}
