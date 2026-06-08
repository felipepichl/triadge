import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { handleApiError } from '@/shared/api/api-error-handler'
import { api } from '@/shared/lib/axios'

export async function apiListAllTransaction(): Promise<TransactionDTO> {
  try {
    const { data } = await api.get<TransactionResponseDTO>('/transactions')

    return {
      transactions: data.transactions,
      balance: data.balance,
    }
  } catch (error) {
    throw handleApiError(error)
  }
}
