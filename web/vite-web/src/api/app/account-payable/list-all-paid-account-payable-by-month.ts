import {
  PaidAccountPayableDTO,
  PaidAccountPayableResponseDTO,
} from '@/dtos/account-payable-dto'
import { api } from '@/lib/axios'

type ListAllPaidAccountsPayableByMonthBody = {
  month: number
}

export async function apiListAllPaidAccountsPayableByMonth({
  month,
}: ListAllPaidAccountsPayableByMonthBody): Promise<PaidAccountPayableDTO> {
  const { data } = await api.get<PaidAccountPayableResponseDTO>(
    '/accounts-payable/paid/month',
    {
      params: { month },
    },
  )

  const paidAccountsPayable = data.paidAccountsPayable.map(
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

  const { paidAccountsPayableTotalAmount } = data

  return {
    paidAccountsPayable,
    paidAccountsPayableTotalAmount,
  }
}
