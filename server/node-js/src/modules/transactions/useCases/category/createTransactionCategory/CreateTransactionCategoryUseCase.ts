import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { ITransactionCategoriesRepository } from '@modules/transactions/repositories/category/ITransactionCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
}

@injectable()
class CreateTransactionCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('TransactionCategories')
    private transactionCategoriesRepository: ITransactionCategoriesRepository,
  ) {}

  async execute({ description }: IRequest): Promise<void> {
    const nameAlreadyExists =
      await this.transactionCategoriesRepository.findByDescription(description)

    if (nameAlreadyExists) {
      throw new AppError('Transaction Category description already exixts', 400)
    }

    const transactionCategory = TransactionCategory.createTransactionCategory({
      description,
    })

    await this.transactionCategoriesRepository.create(transactionCategory)
  }
}

export { CreateTransactionCategoryUseCase }
