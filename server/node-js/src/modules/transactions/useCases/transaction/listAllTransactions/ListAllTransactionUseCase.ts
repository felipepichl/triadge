import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
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
class ListAllTransactionUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const transactions = await this.transactionsRepository.listByUser(userId)

    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value)
            break
          case 'outcome':
            accumulator.outcome += Number(transaction.value)
            break
          default:
            break
        }
        return accumulator
      },
      {
        income: 0,
        outcome: 0,
      },
    )

    const total = income - outcome

    return {
      transactions,
      balance: {
        income,
        outcome,
        total,
      },
    }
  }
}

export { ListAllTransactionUseCase }
