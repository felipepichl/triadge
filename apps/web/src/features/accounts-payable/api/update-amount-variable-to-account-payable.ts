import { UpdateAmountVariableDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiUpdateAmountVariableToAccountPayable({
  amount,
  accountPayableId,
}: UpdateAmountVariableDTO): Promise<void> {
  try {
    await api.patch(`/accounts-payable/${accountPayableId}/amount-variable`, {
      amount,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
