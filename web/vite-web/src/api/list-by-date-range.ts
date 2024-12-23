import { api } from '@/lib/axios'

export type ListByDateRangeBody = {
  startDate: Date | undefined
  endDate: Date | undefined
}

type TransactionResponse = {
  transactions: {
    _id: string
    props: {
      description: string
      type: string
      amount: number
      date: Date
      financialCategory: {
        id: string
        description: string
      }
    }
  }[]
  balance: {
    income: number
    outcome: number
    total: number
  }
}

export type Transaction = {
  transactions: {
    _id: string
    description: string
    type: string
    amount: number
    date: Date
    financialCategory: {
      id: string
      description: string
    }
  }[]
  balance?: {
    income: number
    outcome: number
    total: number
  }
}

export async function apiListByDateRange({
  startDate,
  endDate,
}: ListByDateRangeBody): Promise<Transaction> {
  const { data } = await api.get<TransactionResponse>(
    '/transactions/date-range',
    {
      params: {
        startDate,
        endDate,
      },
    },
  )

  // console.log(JSON.stringify(data, null, 2))

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
