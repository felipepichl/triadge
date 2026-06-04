import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListAllTransaction(): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>('/transactions')

  return {
    transactions: data.transactions,
    balance: data.balance,
  }
}
