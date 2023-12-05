import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/products/domain/category/Category'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepositry,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    // const standardizedName = name.trim().toLowerCase()

    const nameAlreadyExists = await this.categoriesRepository.findByName(name)

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
