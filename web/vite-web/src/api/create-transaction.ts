import { CreateTransactionDTO } from '@/dtos/TransactionDTO'
import { api } from '@/lib/axios'

export async function apiCreateTransaction({
  description,
  detail,
  type,
  amount,
  date,
  financialCategoryId,
  subcategoryId,
}: CreateTransactionDTO): Promise<void> {
  await api.post('/transactions', {
    description,
    detail,
    type,
    date,
    amount,
    financialCategoryId,
    subcategoryId,
  })
}
