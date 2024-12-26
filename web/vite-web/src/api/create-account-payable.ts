import { AccountPayableDTO } from '@/dtos/AccoutPayableDTO'
import { api } from '@/lib/axios'

export async function apiCreateAccountPayable({
  description,
  amount,
  date,
  installments,
  financialCategoryId,
}: AccountPayableDTO): Promise<void> {
  await api.post('/accounts-payable', {
    description,
    amount,
    date,
    installments,
    financialCategoryId,
  })
}
