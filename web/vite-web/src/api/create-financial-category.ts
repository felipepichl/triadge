import { api } from '@/lib/axios'

export type CreateFinancialCategoryBody = {
  description: string
}

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryBody): Promise<void> {
  const response = await api.post('/financial-category', { description })

  return response.data
}
