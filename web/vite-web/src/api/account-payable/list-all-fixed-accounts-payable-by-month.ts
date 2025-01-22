import {
  FixedAccountPayableDTO,
  FixedAccountPayableResponseDTO,
} from '@/dtos/account-payable-dto'
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
    ({ _id, props: { description, amount, dueDate, financialCategory } }) => ({
      _id,
      description,
      amount,
      dueDate,
      financialCategory,
    }),
  )

  const { fixedAccountsPayableTotalAmount } = data

  return {
    fixedAccountsPayable,
    fixedAccountsPayableTotalAmount,
  }
}
