import { CreateAccountPayableDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export async function apiCreateFixedAccountPayable({
  description,
  amount,
  dueDate,
  financialCategoryId,
  subcategoryId,
}: CreateAccountPayableDTO): Promise<void> {
  try {
    await api.post('/accounts-payable/fixed', {
      description,
      amount,
      dueDate,
      financialCategoryId,
      subcategoryId,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
