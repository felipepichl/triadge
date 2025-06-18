import { UpdateAmountVariableDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiUpdateInterestPaid({
  amount,
  accountPayableId,
}: UpdateAmountVariableDTO): Promise<void> {
  await api.patch(`/accounts-payable/${accountPayableId}/interest-paid`, {
    amount,
  })
}
