import { api } from '@/lib/axios'

export type ListByMonthBody = {
  month: number
}

type TransactionResponse = {
  transactions: {
    _id: string
    props: {
      description: string
      type: string
      value: number
      date: Date
    }
  }[]
  balance: {
    income: number
    outcome: number
  }
}

export type Transaction = {
  transactions: {
    _id: string
    description: string
    type: string
    value: number
    date: Date
  }[]
  balance?: {
    income: number
    outcome: number
  }
}

export async function apiListByMonth({
  month,
}: ListByMonthBody): Promise<Transaction> {
  const { data } = await api.get<TransactionResponse>('/transactions/month', {
    params: { month },
  })

  // console.log(JSON.stringify(data, null, 2))

  const transactions = data.transactions.map(
    ({ _id, props: { description, type, value, date } }) => ({
      _id,
      description,
      type,
      value,
      date,
    }),
  )

  const { balance } = data

  return {
    transactions,
    balance,
  }
}
