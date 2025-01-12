import {
  UnfixedAccountPayableDTO,
  UnfixedAccountPayableResponseDTO,
} from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

type ListAllUnfixedAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllUnfixedAccountsPayableByMonth({
  month,
}: ListAllUnfixedAccountsPayableByMonthBody): Promise<UnfixedAccountPayableDTO> {
  const { data } = await api.get<UnfixedAccountPayableResponseDTO>(
    '/accounts-payable/unfixed/month',
    {
      params: { month },
    },
  )

  const unfixedAccountsPayable = data.unfixedAccountsPayable.map(
    ({ _id, props: { description, amount, dueDate } }) => ({
      _id,
      description,
      amount,
      dueDate,
    }),
  )

  const { unfixedAccountsPayableTotalAmount } = data

  return {
    unfixedAccountsPayable,
    unfixedAccountsPayableTotalAmount,
  }
}
