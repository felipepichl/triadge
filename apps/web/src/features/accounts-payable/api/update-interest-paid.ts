import { UpdateAmountVariableDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export async function apiUpdateInterestPaid({
  amount,
  accountPayableId,
}: UpdateAmountVariableDTO): Promise<void> {
  try {
    await api.patch(`/accounts-payable/${accountPayableId}/interest-paid`, {
      amount,
    })
  } catch (error) {
    throw handleApiError(error)
  }
}
