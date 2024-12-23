import { api } from '@/lib/axios'

export type ListByTypeBody = {
  type: 'income' | 'outcome'
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

export async function apiListByType({
  type,
}: ListByTypeBody): Promise<Transaction> {
  const { data } = await api.get<TransactionResponse>('/transactions/type', {
    params: { type },
  })

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

  return {
    transactions,
  }
}
