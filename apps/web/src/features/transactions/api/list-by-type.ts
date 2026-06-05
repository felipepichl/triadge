import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/shared/lib/axios'
import { handleApiError } from '@/shared/api/api-error-handler'

export type ListByTypeBody = {
  type: 'income' | 'outcome'
}

export async function apiListByType({
  type,
}: ListByTypeBody): Promise<TransactionDTO> {
  try {
    const { data } = await api.get<TransactionResponseDTO>(
      '/transactions/type',
      {
        params: { type },
      },
    )

    return {
      transactions: data.transactions,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
