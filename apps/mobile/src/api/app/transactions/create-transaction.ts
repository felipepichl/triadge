import { CreateTransactionDTO } from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiCreateTransaction({
  description,
  type,
  amount,
  date,
  financialCategoryId,
  subcategoryId,
}: CreateTransactionDTO): Promise<void> {
  try {
    await api.post('/transactions', {
      description,
      type,
      amount,
      date,
      financialCategoryId,
      subcategoryId,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
