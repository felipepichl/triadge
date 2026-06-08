import {
  PaidAccountPayableDTO,
  PaidAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export async function apiListPaidAccountsPayableByMonth(
  month: number,
): Promise<PaidAccountPayableDTO> {
  try {
    const { data } = await api.get<PaidAccountPayableResponseDTO>(
      '/accounts-payable/paid/month',
      {
        params: { month },
      },
    )

    return {
      paidAccountsPayable: data.paidAccountsPayable,
      paidAccountsPayableTotalAmount: data.paidAccountsPayableTotalAmount,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
