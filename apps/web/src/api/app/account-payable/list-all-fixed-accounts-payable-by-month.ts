import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

type ListAllFixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllFixedAccountsPayableByMonth({
  month,
}: ListAllFixedAccountsPayableByMonthBody): Promise<FixedAccountPayableDTO> {
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
