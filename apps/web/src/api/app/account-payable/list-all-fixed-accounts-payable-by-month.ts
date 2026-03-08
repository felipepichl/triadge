import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@umabel/core'

import { api } from '@/lib/axios'

type ListAllFixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllFixedAccountsPayableByMonth({
  month,
}: ListAllFixedAccountsPayableByMonthBody): Promise<FixedAccountPayableDTO> {
  const { data } = await api.get<FixedAccountPayableResponseDTO>(
    '/accounts-payable/fixed/month',
    {
      params: { month },
    },
  )

  const fixedAccountsPayable = data.fixedAccountsPayable.map(
    ({
      _id,
      props: { description, amount, dueDate, isPaid, financialCategory },
    }) => ({
      _id,
      description,
      amount,
      dueDate,
      isPaid,
      financialCategory: financialCategory
        ? {
            _id: financialCategory._id,
            description: financialCategory.props.description,
          }
        : undefined,
    }),
  )

  const { fixedAccountsPayableTotalAmount } = data

  return {
    fixedAccountsPayable,
    fixedAccountsPayableTotalAmount,
  }
}
