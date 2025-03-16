import { TransactionDTO, TransactionResponseDTO } from '@/dtos/transaction-dto'
import { api } from '@/lib/axios'

export type ListByDateRangeBody = {
  startDate: Date | undefined
  endDate: Date | undefined
}

export async function apiListByDateRange({
  startDate,
  endDate,
}: ListByDateRangeBody): Promise<TransactionDTO> {
  const { data } = await api.get<TransactionResponseDTO>(
    '/transactions/date-range',
    {
      params: {
        startDate,
        endDate,
      },
    },
  )

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
