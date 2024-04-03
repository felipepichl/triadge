import { Transaction } from '@modules/transactions/domain/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
  type: 'income' | 'outcome'
  value: number
}

class CreateTransactionUseCase implements IUseCase<IRequest, void> {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ description, type, value }: IRequest): Promise<void> {
    const transaction = Transaction.createTransaction({
      description,
      type,
      value,
    })

    await this.transactionsRepository.create(transaction)
  }
}

export { CreateTransactionUseCase }
