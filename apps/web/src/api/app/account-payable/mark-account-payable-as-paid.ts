import { MarkAccountPayableAsPaidDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

export async function apiMarkAccountPayableAsPaid({
  accountPayableId,
}: MarkAccountPayableAsPaidDTO) {
  try {
    await api.patch(`/accounts-payable/${accountPayableId}/pay`)
  } catch (error) {
    throw handleApiError(error)
  }
}
