import { MarkAccountPayableAsPaidDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiMarkAccountPayableAsPaid({
  accountPayableId,
}: MarkAccountPayableAsPaidDTO) {
  await api.patch(`/accounts-payable/${accountPayableId}/pay`)
}
