import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type ListByDateRangeBody = {
  startDate: Date | undefined
  endDate: Date | undefined
}

export async function apiListByDateRange({
  startDate,
  endDate,
}: ListByDateRangeBody): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>(
    '/transactions/date-range',
    {
      params: {
        startDate,
        endDate,
      },
    },
  )

  return {
    transactions: data.transactions,
    balance: data.balance,
  }
}
