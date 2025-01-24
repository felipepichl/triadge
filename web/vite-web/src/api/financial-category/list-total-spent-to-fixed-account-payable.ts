import { ListTotalSpentByFinancialCategoryResponseDTO } from '@/dtos/financial-category-dto'
import { api } from '@/lib/axios'

export type ListTotalSpentToFixedAccountPayableBody = {
  month: number
}

export async function apiListTotalSpentToFixedAccountPayable({
  month,
}: ListTotalSpentToFixedAccountPayableBody): Promise<ListTotalSpentByFinancialCategoryResponseDTO> {
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
}
