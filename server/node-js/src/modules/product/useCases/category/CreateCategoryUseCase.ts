import { Category } from '@modules/product/domain/category/Category'
import { ICategoryRepositry } from '@modules/product/repositories/category/ICategoryRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  description: string
}

class CreateCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(private categoriesRepository: ICategoryRepositry) {}

  async execute({ description }: IRequest): Promise<void> {
    const descriptionAlreadyExists =
      await this.categoriesRepository.listByDescription(description)

    if (descriptionAlreadyExists) {
      throw new AppError('Description already exixts', 400)
    }

    const category = Category.createCategory({ description })

    await this.categoriesRepository.create(category)
  }
}

export { CreateCategoryUseCase }
