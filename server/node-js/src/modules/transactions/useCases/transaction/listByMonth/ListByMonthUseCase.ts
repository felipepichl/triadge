import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  month: number
}

interface Balance {
  income: number
  outcome: number
  total: number
}

interface IResponse {
  transactions: Transaction[]
  balance: Balance
}

@injectable()
class ListByMonthUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    return null
  }
}

export { ListByMonthUseCase }
