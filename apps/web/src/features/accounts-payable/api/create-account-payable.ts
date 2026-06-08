import { CreateAccountPayableDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiCreateAccountPayable({
  description,
  amount,
  dueDate,
  installments,
  financialCategoryId,
  subcategoryId,
}: CreateAccountPayableDTO): Promise<void> {
  try {
    await api.post('/accounts-payable', {
      description,
      amount,
      dueDate,
      installments,
      financialCategoryId,
      subcategoryId,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
