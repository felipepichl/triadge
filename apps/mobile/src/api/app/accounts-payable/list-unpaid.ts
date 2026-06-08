import {
  UnpaidAccountPayableDTO,
  UnpaidAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListUnpaidAccountsPayableByMonth(
  month: number,
): Promise<UnpaidAccountPayableDTO> {
  try {
    const { data } = await api.get<UnpaidAccountPayableResponseDTO>(
      '/accounts-payable/unpaid/month',
      {
        params: { month },
      },
    )

    return {
      unpaidAccountsPayable: data.unpaidAccountsPayable,
      unpaidAccountsPayableTotalAmount: data.unpaidAccountsPayableTotalAmount,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
