import { CreateAccountPayableDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiCreateAccountPayable({
  description,
  amount,
  dueDate,
  installments,
  financialCategoryId,
  subcategoryId,
}: CreateAccountPayableDTO): Promise<void> {
  await api.post('/accounts-payable', {
    description,
    amount,
    dueDate,
    installments,
    financialCategoryId,
    subcategoryId,
  })
}
