import {
  UnpaidAccountPayableDTO,
  UnpaidAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

type ListAllUnpaidAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllUnpaidAccountsPayableByMonth({
  month,
}: ListAllUnpaidAccountsPayableByMonthBody): Promise<UnpaidAccountPayableDTO> {
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
