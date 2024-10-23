import { api } from '@/lib/axios'

type TransactionResponse = {
  transactions: {
    _id: string
    props: {
      description: string
      type: string
      value: number
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
    value: number
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

export async function apiListAllTransaction(): Promise<Transaction> {
  const { data } = await api.get<TransactionResponse>('/transactions')

  // console.log(JSON.stringify(data, null, 2))

  const transactions = data.transactions.map(
    ({
      _id,
      props: { description, type, value, date, financialCategory },
    }) => ({
      _id,
      description,
      type,
      value,
      date,
      financialCategory,
    }),
  )

  const { balance } = data

  // console.log(JSON.stringify(transactions, null, 2))

  return {
    transactions,
    balance,
  }
}
