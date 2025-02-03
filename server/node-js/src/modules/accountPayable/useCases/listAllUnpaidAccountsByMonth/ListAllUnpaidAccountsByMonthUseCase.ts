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
  unpaidAccountsPayable: AccountPayable[]
  unpaidAccountsPayableTotalAmount: number
}

@injectable()
class ListAllUnpaidAccountsByMonthUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const unpaidAccountsPayable =
      await this.accountsPayableRepository.listAllUnpaidAccountsByMonth(
        userId,
        month,
      )

    const { total } = calculateAccountsPayableTotals(unpaidAccountsPayable)

    return {
      unpaidAccountsPayable,
      unpaidAccountsPayableTotalAmount: total,
    }
  }
}

export { ListAllUnpaidAccountsByMonthUseCase }
