import { api } from '@/lib/axios'

export type CreateTransactionBody = {
  description: string
  detail: string
  type: string
  value: number
  transactionCategoryId: string
}

export async function apiCreateTransaction({
  description,
  detail,
  type,
  value,
  transactionCategoryId,
}: CreateTransactionBody): Promise<void> {
  const response = await api.post('/transactions', {
    description,
    detail,
    type,
    value,
    transactionCategoryId,
  })

  return response.data
}
