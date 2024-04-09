import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { ITransactionCategoriesRepository } from '@modules/transactions/repositories/category/ITransactionCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IResponse {
  transactionCategories: TransactionCategory[]
}

@injectable()
class ListAllTransactionCategoriesUseCase implements IUseCase<void, IResponse> {
  constructor(
    @inject('TransactionCategories')
    private transactionCategoriesRepository: ITransactionCategoriesRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const transactionCategories =
      await this.transactionCategoriesRepository.listAll()

    return {
      transactionCategories,
    }
  }
}

export { ListAllTransactionCategoriesUseCase }
