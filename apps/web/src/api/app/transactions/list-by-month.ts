import { TransactionDTO, TransactionResponseDTO } from '@umabel/core'

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
    ({
      _id,
      props: { description, type, amount, date, financialCategory },
    }) => ({
      _id,
      description,
      type,
      amount,
      date,
      financialCategory: financialCategory
        ? {
            _id: financialCategory.id,
            description: financialCategory.description,
          }
        : undefined,
    }),
  )

  const { balance } = data

  return {
    transactions,
    balance,
  }
}
