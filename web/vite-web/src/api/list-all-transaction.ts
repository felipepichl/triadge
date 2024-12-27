import { TransactionDTO, TransactionResponseDTO } from '@/dtos/transaction-dto'
import { api } from '@/lib/axios'

export async function apiListAllTransaction(): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>('/transactions')

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

  const { balance } = data

  return {
    transactions,
    balance,
  }
}
