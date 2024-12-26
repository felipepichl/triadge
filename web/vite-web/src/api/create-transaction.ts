import { api } from '@/lib/axios'

export type CreateTransactionBody = {
  description: string
  detail?: string
  type: string
  amount: number
  date?: Date
  financialCategoryId: string
  subcategoryId?: string
}

export async function apiCreateTransaction({
  description,
  detail,
  type,
  amount,
  date,
  financialCategoryId,
  subcategoryId,
}: CreateTransactionBody): Promise<void> {
  await api.post('/transactions', {
    description,
    detail,
    type,
    date,
    amount,
    financialCategoryId,
    subcategoryId,
  })
}
