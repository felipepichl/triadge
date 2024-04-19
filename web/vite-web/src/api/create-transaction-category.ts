import { api } from '@/lib/axios'

export type CreateTransactionCategoryBody = {
  description: string
}

export async function apiCreateTransactionCategory({
  description,
}: CreateTransactionCategoryBody): Promise<void> {
  const response = await api.post('/transactions/categories', { description })

  return response.data
}
