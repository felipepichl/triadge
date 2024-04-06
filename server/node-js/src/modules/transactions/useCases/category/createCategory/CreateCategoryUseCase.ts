import { Category } from '@modules/transactions/domain/category/Category'
import { ICategoriesRepository } from '@modules/transactions/repositories/category/ICategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  description: string
}

class CreateCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ description }: IRequest): Promise<void> {
    const nameAlreadyExists =
      await this.categoriesRepository.findByDescription(description)

    if (nameAlreadyExists) {
      throw new AppError('Transaction Category name already exixts', 400)
    }

    const category = Category.createCategory({
      description,
    })

    await this.categoriesRepository.create(category)
  }
}

export { CreateCategoryUseCase }
