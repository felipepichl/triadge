import { api } from '@/lib/axios'

export type NewTransactionCategoryBody = {
  description: string
}

export async function apiNewTransactionCategory({
  description,
}: NewTransactionCategoryBody): Promise<void> {
  const response = await api.post('/transaction/categories', { description })

  return response.data
}
