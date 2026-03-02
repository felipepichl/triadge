import {
  FinancialCategoryDetailDTO,
  FinancialCategoryResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListAllFinancialCategoryByUser(): Promise<
  FinancialCategoryDetailDTO[]
> {
  const { data } = await api.get<{
    financialCategories: FinancialCategoryResponseDTO[]
  }>('/financial-category')

  return data.financialCategories.map(({ _id, props: { description } }) => ({
    _id,
    description,
  }))
}
