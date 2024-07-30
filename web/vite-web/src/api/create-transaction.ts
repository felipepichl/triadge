import { api } from '@/lib/axios'

export type CreateTransactionBody = {
  description: string
  detail?: string
  type: string
  value: number
  date?: Date
  transactionCategoryId: string
}

export async function apiCreateTransaction({
  description,
  detail,
  type,
  value,
  date,
  transactionCategoryId,
}: CreateTransactionBody): Promise<void> {
  const response = await api.post('/transactions', {
    description,
    detail,
    type,
    date,
    value,
    transactionCategoryId,
  })

  return response.data
}
