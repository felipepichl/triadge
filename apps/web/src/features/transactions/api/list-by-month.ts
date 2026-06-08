import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export type ListByMonthBody = {
  month: number
}

export async function apiListByMonth({
  month,
}: ListByMonthBody): Promise<TransactionDTO> {
  try {
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
  } catch (error) {
    throw handleApiError(error)
  }
}
