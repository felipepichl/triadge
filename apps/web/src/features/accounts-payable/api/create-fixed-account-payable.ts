import { CreateAccountPayableDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

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
