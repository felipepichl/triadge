import {
  UnpaidAccountPayableDTO,
  UnpaidAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListUnpaidAccountsPayableByMonth(
  month: number,
): Promise<UnpaidAccountPayableDTO> {
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
}
