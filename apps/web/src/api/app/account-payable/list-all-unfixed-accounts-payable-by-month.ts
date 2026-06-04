import {
  UnfixedAccountPayableDTO,
  UnfixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

type ListAllUnfixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllUnfixedAccountsPayableByMonth({
  month,
}: ListAllUnfixedAccountsPayableByMonthBody): Promise<UnfixedAccountPayableDTO> {
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
