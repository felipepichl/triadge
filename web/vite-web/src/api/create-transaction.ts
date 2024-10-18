import { api } from '@/lib/axios'

export type CreateTransactionBody = {
  description: string
  detail?: string
  type: string
  value: number
  date?: Date
  financialCategoryId: string
}

export async function apiCreateTransaction({
  description,
  detail,
  type,
  value,
  date,
  financialCategoryId,
}: CreateTransactionBody): Promise<void> {
  const response = await api.post('/transactions', {
    description,
    detail,
    type,
    date,
    value,
    financialCategoryId,
  })

  return response.data
}
