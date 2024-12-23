import { api } from '@/lib/axios'

export type CreateTransactionBody = {
  description: string
  detail?: string
  type: string
  amount: number
  date?: Date
  financialCategoryId: string
}

export async function apiCreateTransaction({
  description,
  detail,
  type,
  amount,
  date,
  financialCategoryId,
}: CreateTransactionBody): Promise<void> {
  const response = await api.post('/transactions', {
    description,
    detail,
    type,
    date,
    amount,
    financialCategoryId,
  })

  return response.data
}
