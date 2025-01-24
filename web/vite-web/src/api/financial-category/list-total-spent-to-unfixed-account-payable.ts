import { ListTotalSpentByFinancialCategoryResponseDTO } from '@/dtos/financial-category-dto'
import { api } from '@/lib/axios'

export type ListTotalSpentToUnfixedAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToUnfixedAccountPayable({
  month,
}: ListTotalSpentToUnfixedAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
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
}
