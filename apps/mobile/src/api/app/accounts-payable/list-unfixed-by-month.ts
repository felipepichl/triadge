import {
  UnfixedAccountPayableDTO,
  UnfixedAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListUnfixedAccountsPayableByMonth(
  month: number,
): Promise<UnfixedAccountPayableDTO> {
  try {
    const { data } = await api.get<UnfixedAccountPayableResponseDTO>(
      '/accounts-payable/unfixed/month',
      {
        params: { month },
      },
    )

    return {
      unfixedAccountsPayable: data.unfixedAccountsPayable,
      unfixedAccountsPayableTotalAmount:
        data.unfixedAccountsPayableTotalAmount,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
