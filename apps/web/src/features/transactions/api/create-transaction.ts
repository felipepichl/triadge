import { CreateTransactionDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

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
