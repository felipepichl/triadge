import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
  type: string
  value: number
}

class CreateTransactionUseCase implements IUseCase<IRequest, void> {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ description, type, value }: IRequest): Promise<void> {
    console.log(description, type, value)
  }
}

export { CreateTransactionUseCase }
