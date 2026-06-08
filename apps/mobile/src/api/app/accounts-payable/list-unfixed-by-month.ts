import {
  UnfixedAccountPayableDTO,
  UnfixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListUnfixedAccountsPayableByMonth(
  month: number,
): Promise<UnfixedAccountPayableDTO> {
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
}
