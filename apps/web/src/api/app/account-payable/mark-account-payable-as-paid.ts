import { MarkAccountPayableAsPaidDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiMarkAccountPayableAsPaid({
  accountPayableId,
}: MarkAccountPayableAsPaidDTO) {
  await api.patch(`/accounts-payable/${accountPayableId}/pay`)
}
