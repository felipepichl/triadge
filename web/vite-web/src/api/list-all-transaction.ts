import { api } from '@/lib/axios'

export type TransactionResponse = {
  _id: string
  props: {
    description: string
  }
}

export type Transaction = {
  transaction: {
    description: string
  }
  balance: {
    income: string
    outcome: string
    total: string
  }
}

export async function apiListAllTransaction(): Promise<void> {
  const { data } = await api.get('/transactions')

  console.log(data)

  // return data.transactionCategories.map(({ _id, props: { description } }) => ({
  //   _id,
  //   description,
  // }))
}
