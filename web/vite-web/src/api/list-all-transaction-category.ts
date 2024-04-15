import { api } from '@/lib/axios'

export type TransactionCategoryResponse = {
  _id: string
  props: {
    description: string
  }
}

export type TransactionCategory = {
  _id: string
  description: string
}

export async function apiListAllTransactionCategory(): Promise<
  TransactionCategory[]
> {
  const { data } = await api.get<{
    transactionCategories: TransactionCategoryResponse[]
  }>('/transactions/categories')

  return data.transactionCategories.map(({ _id, props: { description } }) => ({
    _id,
    description,
  }))
}
