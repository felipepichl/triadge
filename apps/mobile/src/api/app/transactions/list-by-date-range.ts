import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { handleApiError } from '@/api/api-error-handler'
import { api } from '@/lib/axios'

export type ListByDateRangeBody = {
  startDate: Date
  endDate: Date
}

export async function apiListByDateRange({
  startDate,
  endDate,
}: ListByDateRangeBody): Promise<TransactionDTO> {
  try {
    const { data } = await api.get<TransactionResponseDTO>(
      '/transactions/date-range',
      {
        params: { startDate, endDate },
      },
    )

    return {
      transactions: data.transactions,
      balance: data.balance,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
