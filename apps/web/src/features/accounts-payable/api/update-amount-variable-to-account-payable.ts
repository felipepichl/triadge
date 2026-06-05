import { UpdateAmountVariableDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

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
