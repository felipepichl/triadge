import { CreateTransactionDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiCreateTransaction({
  description,
  type,
  amount,
  date,
  financialCategoryId,
  subcategoryId,
}: CreateTransactionDTO): Promise<void> {
  await api.post('/transactions', {
    description,
    type,
    amount,
    date,
    financialCategoryId,
    subcategoryId,
  })
}
