import { MarkAccountPayableAsPaidDTO } from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

export async function apiMarkAccountPayableAsPaid({
  accoutPayableId,
}: MarkAccountPayableAsPaidDTO) {
  await api.patch(`/accounts-payable/${accoutPayableId}/pay`)
}
