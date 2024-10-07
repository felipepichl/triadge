import { api } from '@/lib/axios'

export type FinancialCategoryResponse = {
  _id: string
  props: {
    description: string
  }
}

export type FinancialCategory = {
  _id: string
  description: string
}

export async function apiListAllFinancialCategoryByUser(): Promise<
  FinancialCategory[]
> {
  const { data } = await api.get<{
    financialCategories: FinancialCategoryResponse[]
  }>('/financial-category')

  return data.financialCategories.map(({ _id, props: { description } }) => ({
    _id,
    description,
  }))
}
