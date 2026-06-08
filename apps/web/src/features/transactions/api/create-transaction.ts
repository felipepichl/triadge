import { CreateTransactionDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiCreateTransaction({
  description,
  detail,
  type,
  amount,
  date,
  financialCategoryId,
  subcategoryId,
}: CreateTransactionDTO): Promise<void> {
  try {
    await api.post('/transactions', {
      description,
      detail,
      type,
      date,
      amount,
      financialCategoryId,
      subcategoryId,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
