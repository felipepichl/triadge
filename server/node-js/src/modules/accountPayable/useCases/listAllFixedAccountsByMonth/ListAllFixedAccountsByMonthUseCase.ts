import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  month: number
}

interface IResponse {
  fixedAccountsPayable: AccountPayable[]
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

    return {
      fixedAccountsPayable,
    }
  }
}

export { ListAllFixedAccountsByMonthUseCase }
