import {
  UnfixedAccountPayableDTO,
  UnfixedAccountPayableResponseDTO,
} from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

type ListAllUnfixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllUnfixedAccountsPayableByMonth({
  month,
}: ListAllUnfixedAccountsPayableByMonthBody): Promise<UnfixedAccountPayableDTO> {
  try {
    const { data } = await api.get<UnfixedAccountPayableResponseDTO>(
      '/accounts-payable/unfixed/month',
      {
        params: { month },
      },
    )

    return {
      unfixedAccountsPayable: data.unfixedAccountsPayable,
      unfixedAccountsPayableTotalAmount: data.unfixedAccountsPayableTotalAmount,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
