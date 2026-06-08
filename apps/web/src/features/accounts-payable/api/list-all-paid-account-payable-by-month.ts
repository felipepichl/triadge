import {
  PaidAccountPayableDTO,
  PaidAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

type ListAllPaidAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllPaidAccountsPayableByMonth({
  month,
}: ListAllPaidAccountsPayableByMonthBody): Promise<PaidAccountPayableDTO> {
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
