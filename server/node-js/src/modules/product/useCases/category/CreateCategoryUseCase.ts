import { Category } from '@modules/product/domain/category/Category'
import { ICategoryRepositry } from '@modules/product/repositories/category/ICategoryRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(private categoriesRepository: ICategoryRepositry) {}

  async execute({ name, description }: IRequest): Promise<void> {
    // const standardizedName = name.trim().toLowerCase()

    const nameAlreadyExists =
      await this.categoriesRepository.listByDescription(name)

    if (nameAlreadyExists) {
      throw new AppError('Category name already exixts', 400)
    }

    const category = Category.createCategory({
      name,
      description,
    })

    await this.categoriesRepository.create(category)
  }
}

export { CreateCategoryUseCase }
