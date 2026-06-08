import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListFixedAccountsPayableByMonth(
  month: number,
): Promise<FixedAccountPayableDTO> {
  try {
    const { data } = await api.get<FixedAccountPayableResponseDTO>(
      '/accounts-payable/fixed/month',
      {
        params: { month },
      },
    )

    return {
      fixedAccountsPayable: data.fixedAccountsPayable,
      fixedAccountsPayableTotalAmount: data.fixedAccountsPayableTotalAmount,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
