import { TransactionDTO, TransactionResponseDTO } from '@/dtos/transaction-dto'
import { api } from '@/lib/axios'

export type ListByMonthBody = {
  month: number
}

export async function apiListByMonth({
  month,
}: ListByMonthBody): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>(
    '/transactions/month',
    {
      params: { month },
    },
  )

  const transactions = data.transactions.map(
    ({ _id, props: { description, type, amount, date } }) => ({
      _id,
      description,
      type,
      amount,
      date,
    }),
  )

  const { balance } = data

  return {
    transactions,
    balance,
  }
}
