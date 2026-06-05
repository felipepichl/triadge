import { MarkAccountPayableAsPaidDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export async function apiMarkAccountPayableAsPaid({
  accountPayableId,
}: MarkAccountPayableAsPaidDTO) {
  try {
    await api.patch(`/accounts-payable/${accountPayableId}/pay`)
  } catch (error) {
    throw handleApiError(error)
  }
}
