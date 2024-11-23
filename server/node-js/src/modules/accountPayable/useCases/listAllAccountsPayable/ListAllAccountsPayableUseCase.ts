import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  userId: string
}

interface IResponse {
  accountsPayable: AccountPayable[]
}

class ListAllAccountsPayable implements IUseCase<IRequest, IResponse> {
  constructor(private accountsPayableRepository: IAccountsPayableRepository) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const accountsPayable = await this.accountsPayableRepository.listAll(userId)

    if (!accountsPayable) {
      throw new AppError('Register not found')
    }

    return {
      accountsPayable,
    }
  }
}

export { ListAllAccountsPayable }
