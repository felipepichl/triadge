import { api } from '@/lib/axios'

type TransactionResponse = {
  transactions: {
    _id: string
    props: {
      description: string
      type: string
      value: number
      transactionCategoryId: string
    }
  }[]
  balance: {
    income: number
    outcome: number
    total: number
  }
}

type Transaction = {
  transactions: {
    _id: string
    description: string
    type: string
    value: number
    transactionCategoryId: string
  }[]
  balance: {
    income: number
    outcome: number
    total: number
  }
}

export async function apiListAllTransaction(): Promise<Transaction> {
  const { data } = await api.get<TransactionResponse>('/transactions')

  const transactions = data.transactions.map(
    ({ _id, props: { description, type, value, transactionCategoryId } }) => ({
      _id,
      description,
      type,
      value,
      transactionCategoryId,
    }),
  )

  const { balance } = data

  return {
    transactions,
    balance,
  }
}
