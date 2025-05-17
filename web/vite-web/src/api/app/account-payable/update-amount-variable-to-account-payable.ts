import { api } from '@/lib/axios'

export async function apiUpdateAmountVariableToAccountPayable(
  amount: number,
  accountPayableId: string,
): Promise<void> {
  await api.patch(`/accounts-payable/${accountPayableId}/amount-variable`, {
    amount,
  })
}
