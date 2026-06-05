import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export type ListByDateRangeBody = {
  startDate: Date | undefined
  endDate: Date | undefined
}

export async function apiListByDateRange({
  startDate,
  endDate,
}: ListByDateRangeBody): Promise<TransactionDTO> {
  try {
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
  } catch (error) {
    throw handleApiError(error)
  }
}
