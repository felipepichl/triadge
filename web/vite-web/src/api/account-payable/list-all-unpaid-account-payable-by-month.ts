import {
  UnpaidAccountPayableDTO,
  UnpaidAccountPayableResponseDTO,
} from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

type ListAllUnpaidAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllUnpaidAccountsPayableByMonth({
  month,
}: ListAllUnpaidAccountsPayableByMonthBody): Promise<UnpaidAccountPayableDTO> {
  const { data } = await api.get<UnpaidAccountPayableResponseDTO>(
    '/accounts-payable/unpaid/month',
    {
      params: { month },
    },
  )

  const unpaidAccountsPayable = data.unpaidAccountsPayable.map(
    ({
      _id,
      props: { description, amount, dueDate, isPaid, financialCategory },
    }) => ({
      _id,
      description,
      amount,
      dueDate,
      isPaid,
      financialCategory,
    }),
  )

  const { unpaidAccountsPayableTotalAmount } = data

  return {
    unpaidAccountsPayable,
    unpaidAccountsPayableTotalAmount,
  }
}
