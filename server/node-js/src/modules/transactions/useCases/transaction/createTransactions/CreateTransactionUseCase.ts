import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  detail: string
  type: 'income' | 'outcome'
  date?: Date
  value: number
  userId: string
  financialCategoryId: string
}

@injectable()
class CreateTransactionUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({
    description,
    detail,
    type,
    date,
    value,
    userId,
    financialCategoryId,
  }: IRequest): Promise<void> {
    const transaction = Transaction.createTransaction({
      description,
      detail,
      type,
      date,
      value,
      userId,
      financialCategoryId,
    })

    await this.transactionsRepository.create(transaction)
  }
}

export { CreateTransactionUseCase }
