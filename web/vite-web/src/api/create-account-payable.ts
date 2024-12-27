import { CreateAccountPayableDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiCreateAccountPayable({
  description,
  amount,
  date,
  installments,
  financialCategoryId,
}: CreateAccountPayableDTO): Promise<void> {
  await api.post('/accounts-payable', {
    description,
    amount,
    date,
    installments,
    financialCategoryId,
  })
}
