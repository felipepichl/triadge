import { AccountPayableDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type ListUnpaidAccountsPayableBody = {
  month?: number
}

export async function apiListUnpaidAccountsPayable({
  month,
}: ListUnpaidAccountsPayableBody = {}): Promise<AccountPayableDTO> {
  const today = new Date()
  const currentMonth = month || today.getMonth() + 1

  const { data } = await api.get<{
    unpaidAccountsPayable: {
      _id: string
      props: {
        _id: string
        description: string
        amount: number
        isPaid: boolean
        dueDate: string
        paymentDate?: string
        isFixed: boolean
        financialCategoryId: string
        subcategoryId?: string
      }
    }[]
    unpaidAccountsPayableTotalAmount: number
  }>('/accounts-payable/unpaid/month', {
    params: { month: currentMonth },
  })

  const accountsPayable =
    data.unpaidAccountsPayable?.map(
      ({
        _id,
        props: {
          description,
          amount,
          isPaid,
          dueDate,
          paymentDate,
          isFixed,
          financialCategoryId,
          subcategoryId,
        },
      }) => ({
        _id,
        description,
        amount,
        isPaid,
        dueDate: new Date(dueDate),
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
        isFixed,
        financialCategoryId,
        subcategoryId,
      }),
    ) || []

  return {
    accountsPayable,
  }
}
