import {
  AccountPayableDTO,
  AccountPayableResponseDTO,
} from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

type ListAllFixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllFixedAccountsPayableByMonth({
  month,
}: ListAllFixedAccountsPayableByMonthBody): Promise<AccountPayableDTO> {
  const { data } = await api.get<AccountPayableResponseDTO>(
    '/accounts-payable/fixed/month',
    {
      params: { month },
    },
  )

  const fixedAccountsPayable = data.fixedAccountsPayable.map(
    ({ _id, props: { description, amount, dueDate } }) => ({
      _id,
      description,
      amount,
      dueDate,
    }),
  )

  const { fixedAccountsPayableTotalAmount } = data

  return {
    fixedAccountsPayable,
    fixedAccountsPayableTotalAmount,
  }
}
