import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  detail: string
  type: 'income' | 'outcome'
  date?: Date
  amount: number
  userId: string
  financialCategoryId: string
  subcategoryId: string
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
    amount,
    userId,
    financialCategoryId,
    subcategoryId,
  }: IRequest): Promise<void> {
    const transaction = Transaction.createTransaction({
      description,
      detail,
      type,
      date,
      amount,
      userId,
      financialCategoryId,
      subcategoryId,
    })

    await this.transactionsRepository.create(transaction)
  }
}

export { CreateTransactionUseCase }
