import { api } from '@/lib/axios'

export type TransactionCategories = {
  description: string
}

export type ListAllTransactionCategoryBody = {
  transactionCategories: TransactionCategories[]
}

export async function apiListAllTransactionCategory(): Promise<ListAllTransactionCategoryBody> {
  const response = await api.get('/transactions/categories')

  return response.data
}
