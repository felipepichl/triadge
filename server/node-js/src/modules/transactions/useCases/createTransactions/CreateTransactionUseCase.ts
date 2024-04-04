import { Transaction } from '@modules/transactions/domain/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
  type: 'income' | 'outcome'
  value: number
  userId: string
  transactionCategoryId: string
}

class CreateTransactionUseCase implements IUseCase<IRequest, void> {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({
    description,
    type,
    value,
    userId,
    transactionCategoryId,
  }: IRequest): Promise<void> {
    const transaction = Transaction.createTransaction({
      description,
      type,
      value,
      userId,
      transactionCategoryId,
    })

    await this.transactionsRepository.create(transaction)
  }
}

export { CreateTransactionUseCase }
