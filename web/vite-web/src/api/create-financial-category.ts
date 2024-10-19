import { api } from '@/lib/axios'

export type CreateSubcategoryBody = {
  description: string
}

export async function apiCreateFinancialCategory({
  description,
}: CreateSubcategoryBody): Promise<void> {
  const response = await api.post('/financial-category', { description })

  return response.data
}
