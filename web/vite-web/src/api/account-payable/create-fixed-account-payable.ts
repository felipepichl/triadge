import { CreateAccountPayableDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiCreateFixedAccountPayable({
  description,
  amount,
  dueDate,
  financialCategoryId,
  subcategoryId,
}: CreateAccountPayableDTO): Promise<void> {
  await api.post('/accounts-payable/fixed', {
    description,
    amount,
    dueDate,
    financialCategoryId,
    subcategoryId,
  })
}
