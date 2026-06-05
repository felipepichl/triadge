import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

type ListAllFixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllFixedAccountsPayableByMonth({
  month,
}: ListAllFixedAccountsPayableByMonthBody): Promise<FixedAccountPayableDTO> {
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
