import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'
import { handleApiError } from '../utils/api-error-handler'

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
