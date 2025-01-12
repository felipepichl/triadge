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
  unfixedAccountsPayable: AccountPayable[]
  unfixedAccountsPayableTotalAmount: number
}

@injectable()
class ListAllUnfixedAccountsByMonthUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const unfixedAccountsPayable =
      await this.accountsPayableRepository.listAllUnfixedAccountsByMonth(
        userId,
        month,
      )

    const { total } = calculateAccountsPayableTotals(unfixedAccountsPayable)

    return {
      unfixedAccountsPayable,
      unfixedAccountsPayableTotalAmount: total,
    }
  }
}

export { ListAllUnfixedAccountsByMonthUseCase }
