import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListFixedAccountsPayableByMonth(
  month: number,
): Promise<FixedAccountPayableDTO> {
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
}
