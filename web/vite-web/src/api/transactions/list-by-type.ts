import { TransactionDTO, TransactionResponseDTO } from '@/dtos/transaction-dto'
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

  const transactions = data.transactions.map(
    ({
      _id,
      props: { description, type, amount, date, financialCategory },
    }) => ({
      _id,
      description,
      type,
      amount,
      date,
      financialCategory,
    }),
  )

  return {
    transactions,
  }
}
