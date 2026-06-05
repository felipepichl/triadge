import { CreateAccountPayableDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

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
