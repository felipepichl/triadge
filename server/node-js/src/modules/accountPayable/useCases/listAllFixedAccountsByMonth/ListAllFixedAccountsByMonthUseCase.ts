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
  fixedAccountsPayable: AccountPayable[]
  fixedAccountsPayableTotalAmount: number
}

@injectable()
class ListAllFixedAccountsByMonthUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('AccountsPayableRepository')
    private accountsPayableRepository: IAccountsPayableRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const fixedAccountsPayable =
      await this.accountsPayableRepository.listAllFixedAccountsByMonth(
        userId,
        month,
      )

    const { total } = calculateAccountsPayableTotals(fixedAccountsPayable)

    return {
      fixedAccountsPayable,
      fixedAccountsPayableTotalAmount: total,
    }
  }
}

export { ListAllFixedAccountsByMonthUseCase }
