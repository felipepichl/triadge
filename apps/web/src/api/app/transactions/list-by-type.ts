import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type ListByTypeBody = {
  type: 'income' | 'outcome'
}

export async function apiListByType({
  type,
}: ListByTypeBody): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>('/transactions/type', {
    params: { type },
  })

  return {
    transactions: data.transactions,
  }
}
