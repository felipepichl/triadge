import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { ITransactionCategoriesRepository } from '@modules/transactions/repositories/category/ITransactionCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  transactionCategories: TransactionCategory[]
}

class ListAllTransactionCategoriesUseCase implements IUseCase<void, IResponse> {
  constructor(
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
