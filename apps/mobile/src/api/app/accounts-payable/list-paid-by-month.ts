import {
  PaidAccountPayableDTO,
  PaidAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListPaidAccountsPayableByMonth(
  month: number,
): Promise<PaidAccountPayableDTO> {
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
}
