import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type ListByMonthBody = {
  month: number
}

export async function apiListByMonth({
  month,
}: ListByMonthBody): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>(
    '/transactions/month',
    {
      params: { month },
    },
  )

  return {
    transactions: data.transactions,
    balance: data.balance,
  }
}
