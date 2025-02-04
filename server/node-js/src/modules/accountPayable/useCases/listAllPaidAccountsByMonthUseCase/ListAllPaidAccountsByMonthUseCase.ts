import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { calculateAccountsPayableTotals } from '@modules/accountPayable/utils/AccountPayableUtils'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  month: number
}

interface IResponse {
  paidAccountsPayable: AccountPayable[]
  paidAccountsPayableTotalAmount: number
}

@injectable()
class ListAllPaidAccountsByMonthUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const paidAccountsPayable =
      await this.accountsPayableRepository.listAllPaidAccountsByMonth(
        userId,
        month,
      )

    const { total } = calculateAccountsPayableTotals(paidAccountsPayable)

    return {
      paidAccountsPayable,
      paidAccountsPayableTotalAmount: total,
    }
  }
}

export { ListAllPaidAccountsByMonthUseCase }
