import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  type: ITransactionType
}

interface IResponse {
  transactions: Transaction[]
}

@injectable()
class ListByTypeUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const transactions = await this.transactionsRepository.listByType(
      userId,
      type,
    )

    return {
      transactions,
    }
  }
}

export { ListByTypeUseCase }
