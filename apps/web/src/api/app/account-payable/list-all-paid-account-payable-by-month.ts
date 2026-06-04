import {
  PaidAccountPayableDTO,
  PaidAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

type ListAllPaidAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllPaidAccountsPayableByMonth({
  month,
}: ListAllPaidAccountsPayableByMonthBody): Promise<PaidAccountPayableDTO> {
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
